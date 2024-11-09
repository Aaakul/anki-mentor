import React from "react";
import { GithubOutlined } from "@ant-design/icons";
import { Space } from "antd";

const CardExtra: React.FC = () => {
  return (
    <Space>
      <a
        href="https://www.github.com/aaakul"
        target="_blank"
        rel="noopener noreferrer"
        className="main-card-extra"
      >
        <GithubOutlined />
      </a>
    </Space>
  );
};

export default CardExtra;
