import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Popconfirm, Row, Table} from 'antd';
import TextArea from "antd/lib/input/TextArea.js";
import {
    useCreateSoftwareExternals,
    useDeleteSoftwareExternals,
    useFetchSoftwareExternals,
    useUpdateSoftwareExternals
} from "./querySoftwareExternal.js";

import {
    EditableRow, EditableCell
} from "./EditableCell.jsx";


const SoftwareAssetsTable = () => {
    const {data, isLoading, isError} = useFetchSoftwareExternals();

    const [dataSource, setDataSource] = useState([
        {
            id: '0',
            name: 'string-1',
            description: 'string-1',
        },
    ]);

    useEffect(() => {
        if (data && !isLoading && !isError) {
            const dataSourceNew = data.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description
            }))
            setDataSource(dataSourceNew);
        }
    }, [data, isLoading, isError]);

    const mutationPost = useCreateSoftwareExternals()
    const mutationDelete = useDeleteSoftwareExternals()
    const mutationPut = useUpdateSoftwareExternals()

    const handleDelete = (id) => {
        mutationDelete.mutate(id)
    };

    const handleAdd = () => {
        const newData = {
            name: 'string-1',
            description: 'string-1',
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
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'description',
            dataIndex: 'description',
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
                        <strong>소프트웨어 외부 자료</strong>
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
export default SoftwareAssetsTable;