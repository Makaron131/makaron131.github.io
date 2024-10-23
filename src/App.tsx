import { useEffect, useState } from "react";
import "./App.css";
import { getIssues } from "./apis";
import { IIssueNode } from "./types";
import { List } from "antd";
import MarkdownRender from "./components/markdown-render";

function App() {
  const [issues, setIssues] = useState<IIssueNode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getIssues()
      .then((res) => {
        // console.debug(res);

        setIssues(res.repository.issues.nodes);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={issues}
        renderItem={(issue) => {
          return (
            <List.Item>
              <List.Item.Meta title={issue.title} />
              <MarkdownRender content={issue.body} />
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
}

export default App;
