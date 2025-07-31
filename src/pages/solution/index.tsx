import { Tag, List, Typography, Space, Button } from "antd";
import { CodeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.css";
import { IIssueNode, ILabels } from "../../types";
import { useEffect, useState, useCallback } from "react";
import { getIssues } from "../../apis";
import Detail from "./detail";

const { Title, Text } = Typography;

// 渲染标签的辅助函数
const renderTags = (labels: ILabels) => {
  return labels.nodes.map((label) => (
    <Tag key={label.id} color={`#${label.color}`} className="solution-tag">
      {label.name}
    </Tag>
  ));
};

const DEFAULT_PAGE_SIZE = 12;

const Solution = () => {
  const [issues, setIssues] = useState<IIssueNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  // const [, setStartCursor] = useState<string>("");
  const [endCursor, setEndCursor] = useState<string>("");
  const [pageHistory, setPageHistory] = useState<string[]>([""]); // 存储页面历史的cursor

  const [isList, setIsList] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<IIssueNode>();

  // 获取数据的通用函数
  const fetchIssues = useCallback(async (cursor: string = "") => {
    setLoading(true);
    try {
      const res = await getIssues(DEFAULT_PAGE_SIZE, cursor);
      const { nodes, pageInfo, totalCount } = res.repository.issues;

      setIssues(nodes);
      setTotalCount(totalCount);
      setHasNextPage(pageInfo.hasNextPage);
      setHasPreviousPage(pageInfo.hasPreviousPage);
      // setStartCursor(pageInfo.startCursor);
      setEndCursor(pageInfo.endCursor);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }, []);

  // 下一页
  const handleNextPage = () => {
    if (hasNextPage && endCursor) {
      const newHistory = [...pageHistory, endCursor];
      setPageHistory(newHistory);
      setCurrentPage(currentPage + 1);
      fetchIssues(endCursor);
    }
  };

  // 上一页
  const handlePrevPage = () => {
    if (hasPreviousPage && currentPage > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // 移除当前页的cursor
      setPageHistory(newHistory);
      setCurrentPage(currentPage - 1);

      // 使用上一页的cursor
      const prevCursor = newHistory[newHistory.length - 1] || "";
      fetchIssues(prevCursor);
    }
  };

  useEffect(() => {
    fetchIssues("");
  }, [fetchIssues]);

  return (
    <>
      {isList && (
        <div className="solution-container">
          <div className="solution-header">
            <Title level={2} className="solution-title">
              <CodeOutlined /> 算法题解集合
            </Title>
            <Text className="solution-subtitle">
              共 {totalCount} 道题目，点击查看详细解答
            </Text>
          </div>

          <List
            className="solution-list"
            loading={loading}
            dataSource={issues}
            pagination={false}
            renderItem={(issue) => (
              <List.Item
                className="solution-list-item"
                onClick={() => {
                  setSelectedIssue(issue);
                  setIsList(false);
                }}
              >
                <div className="solution-item-content">
                  <div className="solution-item-title">{issue.title}</div>
                  <div className="solution-item-tags">
                    <Space size={[4, 4]} wrap>
                      {renderTags(issue.labels)}
                    </Space>
                  </div>
                </div>
              </List.Item>
            )}
          />

          {/* 自定义分页控件 */}
          <div className="solution-pagination">
            <div className="pagination-info">
              <Text>
                第 {(currentPage - 1) * DEFAULT_PAGE_SIZE + 1}-
                {Math.min(currentPage * DEFAULT_PAGE_SIZE, totalCount)} 条，共{" "}
                {totalCount} 条
              </Text>
            </div>
            <Space size="middle">
              <Button
                icon={<LeftOutlined />}
                disabled={!hasPreviousPage || currentPage === 1}
                onClick={handlePrevPage}
              >
                上一页
              </Button>
              <Text className="page-indicator">第 {currentPage} 页</Text>
              <Button
                icon={<RightOutlined />}
                disabled={!hasNextPage}
                onClick={handleNextPage}
              >
                下一页
              </Button>
            </Space>
          </div>
        </div>
      )}
      {!isList && (
        <Detail issue={selectedIssue} onBack={() => setIsList(true)} />
      )}
    </>
  );
};

export default Solution;
