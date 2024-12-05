import { Button } from "antd";
import MarkdownRender from "../../components/markdown-render";
import { IIssueNode } from "../../types";
import { LeftOutlined } from "@ant-design/icons";
import "./detail.css";

interface IProps {
  issue?: IIssueNode;
  onBack?: () => void;
}

const Detail = ({ issue, onBack }: IProps) => {
  return (
    <div>
      <header className="detail-header">
        <Button
          className="detail-back-btn"
          icon={<LeftOutlined style={{ width: 16, height: 16 }} />}
          onClick={onBack}
        ></Button>
        <div>{issue?.title}</div>
      </header>

      <MarkdownRender content={issue?.body || ""} />
    </div>
  );
};

export default Detail;
