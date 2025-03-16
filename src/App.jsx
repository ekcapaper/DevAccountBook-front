import './App.css';


import React, {useState} from 'react';
import {CloudOutlined,} from '@ant-design/icons';
import {Layout, Menu, Splitter, theme} from 'antd';
import logo from './assets/react.svg';
import TechnicalContextDecisionTable from "./TechnicalContextDecisionTable.jsx";
import SoftwareLiabilitiesTable from "./SoftwareLiabilitiesTable.jsx";
import SoftwareAssetsTable from "./SoftwareAssetsTable.jsx";
import SoftwareEquitiesTable from "./SoftwareEquitiesTable.jsx";
import SoftwareMetricTable from "./SoftwareMetricTable.jsx";
import SoftwareRaw from "./SoftwareRaw.jsx";
import SoftwareRawMarkdown from "./SoftwareRawMarkdown.jsx";
import SoftwareExternalTable from "./SoftwareExternalTable.jsx";

const {Header, Content, Footer, Sider} = Layout;


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
        key: "software-raw",
        icon: React.createElement(CloudOutlined),
        label: `Software Raw`,
    },
    {
        key: "software-markdown",
        icon: React.createElement(CloudOutlined),
        label: `Software Markdown`,
    },
    {
        key: "context-decision",
        icon: React.createElement(CloudOutlined),
        label: `Context-Decision`,
    },
    {
        key: "software-all",
        icon: React.createElement(CloudOutlined),
        label: `Software All`,
    },
    {
        key: "software-equities",
        icon: React.createElement(CloudOutlined),
        label: `Software Equities`,
    },
    {
        key: "software-assets",
        icon: React.createElement(CloudOutlined),
        label: `Software Assets`,
    },
    {
        key: "software-liabilities",
        icon: React.createElement(CloudOutlined),
        label: `Software Liabilities`,
    },
    {
        key: "software-metrics",
        icon: React.createElement(CloudOutlined),
        label: `Software Metrics`,
    },
    {
        key: "software-externals",
        icon: React.createElement(CloudOutlined),
        label: `Software externals`,
    }
]

const App = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 선택된 메뉴 상태 관리
    const [selectedMenuItem, setSelectedMenuItem] = useState("software-raw");

    // 선택된 메뉴에 따라 컨텐츠 변경
    const renderContent = () => {
        switch (selectedMenuItem) {
            case "context-decision":
                return <TechnicalContextDecisionTable/>;
            case "software-equities":
                return <SoftwareEquitiesTable/>;
            case "software-assets":
                return <SoftwareAssetsTable/>;
            case "software-liabilities":
                return <SoftwareLiabilitiesTable/>;
            case "software-all":
                return (
                    <div style={{height: '100%'}}>
                        <Splitter style={{height: "100%"}}>
                            <Splitter.Panel collapsible>
                                <SoftwareAssetsTable/>;
                            </Splitter.Panel>
                            <Splitter.Panel collapsible={{start: true}}>
                                <SoftwareEquitiesTable/>;
                            </Splitter.Panel>
                            <Splitter.Panel>
                                <SoftwareLiabilitiesTable/>;
                            </Splitter.Panel>
                        </Splitter>
                    </div>
                )
            case "software-metrics":
                return <SoftwareMetricTable/>
            case "software-raw":
                return <SoftwareRaw></SoftwareRaw>
            case "software-markdown":
                return <SoftwareRawMarkdown></SoftwareRawMarkdown>
            case "software-externals":
                return <SoftwareExternalTable/>
            default:
                return <SoftwareRaw/>;
        }
    };


    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <img src={logo} alt="Logo" width={200}/>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}
                      onClick={(e) => setSelectedMenuItem(e.key)}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer, textAlign: "right", paddingRight: "50px"}}>Software
                    Accounting</Header>
                <Content style={{margin: '24px 16px 0', overflow: 'auto'}}>
                    {renderContent()}
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;