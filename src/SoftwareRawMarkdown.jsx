import React from "react";
import {Card, Splitter} from "antd";
import {useQueries, useQuery} from "@tanstack/react-query";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm"; // 📌 테이블 지원 플러그인 추가
import "highlight.js/styles/github.css"; // 코드 블록 스타일 적용
import SoftwareAssetsTable from "./SoftwareAssetsTable.jsx";
import SoftwareEquitiesTable from "./SoftwareEquitiesTable.jsx";
import SoftwareLiabilitiesTable from "./SoftwareLiabilitiesTable.jsx";
import SoftwareMetricTable from "./SoftwareMetricTable.jsx";
import TechnicalContextDecisionTable from "./TechnicalContextDecisionTable.jsx";

import {useFetchSoftwareAssets} from "./querySoftwareAsset.js";
import {useFetchSoftwareEquities} from "./querySoftwareEquity.js";
import {useFetchSoftwareLiabilities} from "./querySoftwareLiabilities.js";
import {useFetchSoftwareMetrics} from "./querySoftwareMetric.js";
import {useCreateTechnicalAssociations, useFetchTechnicalAssociations} from "./queryTechnicalAssociations.js";

// JSON 데이터를 Markdown 테이블 형식으로 변환하는 함수
const convertToMarkdown = (data) => {
    if (!data || data.length === 0) return "No data available.";

    let markdown = "| ID | Name | Description |\n";
    markdown += "|----|------|------------|\n";

    data.forEach(item => {
        markdown += `| ${item.id} | ${item.name} | ${item.description} |\n`;
    });

    return markdown;
};

const convertToTechnicalContextDecisionMarkdown = (data) => {
    if (!data || data.length === 0) return "No data available.";

    let markdown = "| ID | technicalContextName | technicalContextDescription | technicalDecisionName | technicalDecisionDescription|\n";
    markdown += "|----|------|------------|------|------------|\n";

    data.forEach(item => {
        markdown += `| ${item.id} | ${item.technicalContextDTO.name} | ${item.technicalContextDTO.description} | ${item.technicalDecisionDTO.name} | ${item.technicalDecisionDTO.description} |\n`;
    });

    return markdown;
};


const SoftwareRaw = () => {
    const fetchSoftwareAssets = useFetchSoftwareAssets()
    const fetchSoftwareEquities = useFetchSoftwareEquities()
    const fetchSoftwareLiabilities = useFetchSoftwareLiabilities()
    const fetchSoftwareMetrics = useFetchSoftwareMetrics()
    const fetchTechnicalAssociations =useFetchTechnicalAssociations()

    if (
        fetchSoftwareAssets.isLoading
        || fetchSoftwareEquities.isLoading
        || fetchSoftwareLiabilities.isLoading
        || fetchSoftwareMetrics.isLoading
        || fetchSoftwareEquities.isLoading
        || fetchTechnicalAssociations.isLoading
    ) {
        return <div>Loading...</div>;
    }

    if (fetchSoftwareAssets.isError
        || fetchSoftwareEquities.isError
        || fetchSoftwareLiabilities.isError
        || fetchSoftwareMetrics.isError
        || fetchSoftwareEquities.isError
        || fetchTechnicalAssociations.isError) {
        return <div>Error: {fetchSoftwareAssets.error.message}</div>;
    }

    console.log(fetchTechnicalAssociations.data)
    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            {/* Markdown 원본 표시 */}
            <Card style={{ flex: 1 }}>
                <h3>Software Assets (Markdown Format)</h3>
                <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                    <code>{convertToMarkdown(fetchSoftwareAssets.data || [])}</code>
                </pre>

                <h3>Software Liabilities (Markdown Format)</h3>
                <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                    <code>{convertToMarkdown(fetchSoftwareLiabilities.data || [])}</code>
                </pre>

                <h3>Software Equities (Markdown Format)</h3>
                <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                    <code>{convertToMarkdown(fetchSoftwareEquities.data || [])}</code>
                </pre>

                <h3>Software Metric (Markdown Format)</h3>
                <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                    <code>{convertToMarkdown(fetchSoftwareMetrics.data || [])}</code>
                </pre>

                <h3>Technical Associations (Markdown Format)</h3>
                <pre style={{ background: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                    <code>{convertToTechnicalContextDecisionMarkdown(fetchTechnicalAssociations.data || [])}</code>
                </pre>

            </Card>

        </div>
    );
};

export default SoftwareRaw;
