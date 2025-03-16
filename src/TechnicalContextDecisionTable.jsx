import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Popconfirm, Row, Table} from 'antd';
import {
    useCreateTechnicalAssociations,
    useDeleteTechnicalAssociations,
    useFetchTechnicalAssociations,
    useUpdateTechnicalAssociations
} from "./queryTechnicalAssociations.js";
import TextArea from "antd/lib/input/TextArea.js";

import {
    EditableRow, EditableCell
} from "./EditableCell.jsx";
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