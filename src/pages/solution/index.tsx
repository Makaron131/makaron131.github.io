import { Table, Tag } from "antd";
import "./index.css";
import { IIssueNode, ILabels } from "../../types";
import { useEffect, useState } from "react";
import { getIssues } from "../../apis";
import { ColumnsType } from "antd/es/table";
import Detail from "./detail";

const columns: ColumnsType<IIssueNode> = [
  { key: "title", title: "标题", dataIndex: "title" },
  {
    key: "tags",
    title: "标签",
    dataIndex: "labels",
    render: (labels: ILabels) => {
      return labels.nodes.map((label) => {
        return (
          <Tag bordered key={label.id} color={`#${label.color}`}>
            {label.name}
          </Tag>
        );
      });
    },
  },
];

const Solution = () => {
  const [issues, setIssues] = useState<IIssueNode[]>([]);
  const [loading, setLoading] = useState(false);

  const [isList, setIsList] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<IIssueNode>();
  //   const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    getIssues()
      .then((res) => {
        // console.debug(res);

        setIssues(res.repository.issues.nodes);
        // setTotalCount(res.repository.issues.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <>
      {isList && (
        <Table
          pagination={{
            defaultPageSize: 9,
            position: ["topRight", "bottomRight"],
          }}
          className="solution"
          loading={loading}
          bordered
          onRow={(record) => ({
            onClick: () => {
              setSelectedIssue(record);
              setIsList(false);
            },
          })}
          rowKey="id"
          dataSource={issues}
          columns={columns}
        />
      )}
      {!isList && (
        <Detail issue={selectedIssue} onBack={() => setIsList(true)} />
      )}
    </>
  );
};

export default Solution;
