import './App.css';


import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Splitter, Typography} from 'antd';
import { Layout, Menu, theme } from 'antd';
import logo from './assets/react.svg';
import TechnicalContextDecisionTable from "./TechnicalContextDecisionTable.jsx";


const { Header, Content, Footer, Sider } = Layout;


const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const items = [
    {
        key: String( 1),
        icon: React.createElement(CloudOutlined),
        label: `Context-Decision`,
    }
]

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <img src={logo} alt="Logo" width={200} />
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: "right", paddingRight: "50px"}} >Software Accounting</Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <TechnicalContextDecisionTable></TechnicalContextDecisionTable>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;