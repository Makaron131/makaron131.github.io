import { FC, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism.css";
import "github-markdown-css/github-markdown.css";
import Prism from "prismjs";

interface IProps {
  content: string;
}

const MarkdownRender: FC<IProps> = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
