import React, {useContext, useEffect, useRef} from "react";
import {Button, Col, Form, Popconfirm, Row, Table} from 'antd';
import TextArea from "antd/lib/input/TextArea.js";

const EditableContext = React.createContext(null);
export const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};


export const EditableCell = ({
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
            [dataIndex]: form.getFieldValue(dataIndex) + "\n",
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
