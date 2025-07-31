import { Card, Row, Col, Typography, Avatar, Divider, Tag, Button } from "antd";
import { GithubOutlined, CodeOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./home.css";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Docker",
    "Kubernetes",
  ];

  const algorithmProject = {
    title: "算法题解集合",
    description:
      "深入探索算法世界，收集和整理各种经典算法题目的解题思路、代码实现和复杂度分析。从基础数据结构到高级算法技巧，助你在编程路上更进一步。",
    tags: ["算法", "数据结构", "LeetCode"],
    link: "/solution",
    stats: {
      problems: "40+",
      categories: "10+",
      difficulty: "Easy → Hard",
    },
  };

  return (
    <div className="home-container">
      {/* 个人介绍区域 */}
      <Card className="intro-card">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} className="avatar-section">
            <Avatar
              size={120}
              className="avatar"
              src="https://avatars.githubusercontent.com/Makaron131"
              alt="Makaron131"
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2} className="name">
              Makaron131
            </Title>
            <Paragraph className="bio">
              热爱编程的开发者，专注于前端技术和算法学习。
              喜欢探索新技术，分享技术心得，持续学习和成长。
            </Paragraph>
            <div className="contact-links">
              <Button
                type="text"
                icon={<GithubOutlined />}
                href="https://github.com/Makaron131"
                target="_blank"
              >
                GitHub
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 技能标签 */}
      <Card title="技能栈" className="skills-card">
        <div className="skills-container">
          {skills.map((skill, index) => (
            <Tag key={index} color="blue" className="skill-tag">
              {skill}
            </Tag>
          ))}
        </div>
      </Card>

      {/* 算法题解集合 */}
      <Card className="algorithm-showcase-card">
        <div className="algorithm-showcase">
          <div className="algorithm-header">
            <Title level={3} className="algorithm-title">
              {algorithmProject.title}
            </Title>
            <div className="algorithm-stats">
              <div className="stat-item">
                <span className="stat-number">
                  {algorithmProject.stats.problems}
                </span>
                <span className="stat-label">题目</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">
                  {algorithmProject.stats.categories}
                </span>
                <span className="stat-label">分类</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">
                  {algorithmProject.stats.difficulty}
                </span>
                <span className="stat-label">难度</span>
              </div>
            </div>
          </div>

          <Paragraph className="algorithm-description">
            {algorithmProject.description}
          </Paragraph>

          <div className="algorithm-tags">
            {algorithmProject.tags.map((tag, index) => (
              <Tag key={index} className="algorithm-tag">
                {tag}
              </Tag>
            ))}
          </div>

          <div className="algorithm-actions">
            <Button
              type="primary"
              size="large"
              icon={<CodeOutlined />}
              className="explore-button"
              onClick={() => navigate(algorithmProject.link)}
            >
              开始探索
            </Button>
            <Button
              size="large"
              className="preview-button"
              onClick={() => navigate(algorithmProject.link)}
            >
              预览题目
            </Button>
          </div>
        </div>
      </Card>

      {/* 最新动态 */}
      <Card title="最新动态" className="updates-card">
        <div className="update-item">
          <Text type="secondary">2024-01-15</Text>
          <Divider type="vertical" />
          <Text>
            <BookOutlined /> 更新了算法题解
          </Text>
        </div>
        <div className="update-item">
          <Text type="secondary">2024-01-10</Text>
          <Divider type="vertical" />
          <Text>
            <CodeOutlined /> 完成了 React 组件库的基础架构
          </Text>
        </div>
        <div className="update-item">
          <Text type="secondary">2024-01-05</Text>
          <Divider type="vertical" />
          <Text>
            <GithubOutlined /> 开源了个人博客项目
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Home;
