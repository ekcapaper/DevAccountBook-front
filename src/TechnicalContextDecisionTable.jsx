import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Popconfirm, Row, Table} from 'antd';
import {
    useCreateTechnicalAssociations,
    useDeleteTechnicalAssociations,
    useFetchTechnicalAssociations,
    useUpdateTechnicalAssociations
} from "./queryTechnicalAssociations.js";
import TextArea from "antd/lib/input/TextArea.js";

const EditableContext = React.createContext(null);
const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    // 최초 렌더링 시 기존 데이터 설정
    useEffect(() => {
        if (record && record[dataIndex] !== undefined) {
            form.setFieldsValue({
                [dataIndex]: record[dataIndex] || "", // 값이 없으면 빈 문자열 설정
            });
        }
    }, [record, dataIndex, form]);

    // 포커스가 떠날 때 자동 저장
    const handleBlur = () => {
        handleSave({
            ...record,
            [dataIndex]: form.getFieldValue(dataIndex), // 현재 입력된 값 가져와서 저장
        });
    };

    // 엔터 입력 시 자동 저장
    const handlePressEnter = (e) => {
        e.preventDefault(); // 기본 엔터 동작 방지 (줄 바꿈 방지)
        handleSave({
            ...record,
            [dataIndex]: form.getFieldValue(dataIndex),
        });
    };

    return (
        <td
            {...restProps}
            style={{
                padding: dataIndex === "id" ? "4px" : "0px", // 첫 번째 필드는 패딩 추가, 나머지는 제거
                textAlign: dataIndex === "id" ? "center" : "center",
            }}
        >
            {editable ? (
                <Form.Item
                    style={{margin: 0, width: "100%", height: "100%"}}
                    name={dataIndex}
                >
                    <TextArea
                        ref={inputRef}
                        value={record[dataIndex]} // 기존 데이터 미리 채워줌
                        autoSize={{minRows: 1, maxRows: 4}} // 입력 크기 제한
                        style={{
                            width: "100%", // 가로 너비 100%로 설정 (셀을 완전히 채움)
                            height: "100%", // 높이도 최대한 확장
                            minHeight: "40px", // 최소 높이 설정
                            resize: "none", // 크기 조절 비활성화
                            border: "none", // 테이블의 경계를 자연스럽게 유지
                        }}
                        onBlur={handleBlur} // 포커스가 떠날 때 저장
                        onPressEnter={handlePressEnter} // 엔터 입력 시 저장
                    />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const TechnicalContextDecisionTable = () => {
    const {data, isLoading, isError} = useFetchTechnicalAssociations();

    const [dataSource, setDataSource] = useState([
        {
            id: '0',
            technicalContextName: 'string-1',
            technicalContextDescription: 'string-1',
            technicalDecisionName: 'string-2',
            technicalDecisionDescription: 'string-2'
        },
    ]);

    useEffect(() => {
        if (data && !isLoading && !isError) {
            const dataSourceNew = data.map(item => ({
                id: item.id,
                technicalContextName: item.technicalContextDTO.name,
                technicalContextDescription: item.technicalContextDTO.description,
                technicalDecisionName: item.technicalDecisionDTO.name,
                technicalDecisionDescription: item.technicalDecisionDTO.description,
            }))
            setDataSource(dataSourceNew);
        }
    }, [data, isLoading, isError]);

    const mutationPost = useCreateTechnicalAssociations()
    const mutationDelete = useDeleteTechnicalAssociations()
    const mutationPut = useUpdateTechnicalAssociations()

    const handleDelete = (id) => {
        mutationDelete.mutate(id)
    };

    const handleAdd = () => {
        const newData = {
            technicalContextName: 'string-1',
            technicalContextDescription: 'string-1',
            technicalDecisionName: 'string-2',
            technicalDecisionDescription: 'string-2'
        };
        mutationPost.mutate(newData);
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const oldItem = newData[index];

        // 새로운 값
        const updatedItem = {
            ...oldItem,
            ...row,
        };

        // putMutation.mutate(...)에 최신 정보 전달
        mutationPut.mutate(updatedItem);
    };


    const defaultColumns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '5%',
            editable: false,
        },
        {
            title: 'technicalContextName',
            dataIndex: 'technicalContextName',
            width: '30%',
            editable: true,
        },
        {
            title: 'technicalContextDescription',
            dataIndex: 'technicalContextDescription',
            width: '30%',
            editable: true,
        },
        {
            title: 'technicalDecisionName',
            dataIndex: 'technicalDecisionName',
            width: '30%',
            editable: true,
        },
        {
            title: 'technicalDecisionDescription',
            dataIndex: 'technicalDecisionDescription',
            width: '30%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Row>
                <Col span={12}>
                    <div style={{padding: '20px', textAlign: 'left'}}>
                        <strong>기술적 정황 - 기술적 결정</strong>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{padding: '10px', textAlign: 'right'}}>
                        <Button
                            onClick={handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            추가
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
            />
        </div>
    );
};
export default TechnicalContextDecisionTable;