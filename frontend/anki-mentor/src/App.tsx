import React, { useState } from "react";
import {
  CopyOutlined,
  SettingOutlined,
  ReloadOutlined,
  SendOutlined,
  HeartFilled,
  GithubOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Card,
  ConfigProvider,
  Space,
  theme,
  message,
  Radio,
  Modal,
  Flex,
} from "antd";
import type { RadioChangeEvent } from "antd";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import axios from "axios";
import TagEditor from "./components/TagEditor";

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [responseText, setResponseText] = useState("");
  // Modal visibility
  const [showSetting, setShowSetting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleSend = async () => {
    if (tags.length > 0) {
      const words = tags.join(",");
      try {
        const response = await axios.post<string, any>(
          process.env.REACT_APP_API_URL!,
          {
            message: words,
          }
        );
        setResponseText(response.data.response); // Update output text
      } catch (error) {
        setResponseText(`Input:${words};Error:${error}`);
      }
    }
  };

  const handleCopy = () => {
    if (responseText) {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(responseText).then(
          () => {
            message.success("Copied to clipboard");
          },
          (err) => {
            console.error("Failed to copy:", err);
            message.error("Copy failed", err);
          }
        );
      } else {
        message.warning("Clipboard API is not supported.");
      }
    }
  };

  const handleReload = () => {
    message.info("handleReload()");
  };

  const handleOk = () => {
    setShowSetting(false);
    setShowQuestion(false);
  };

  const handleCancel = () => {
    setShowSetting(false);
    setShowQuestion(false);
  };

  // Modal for settings
  const handleSetting = () => {
    setShowSetting(true);
  };

  const setting = (
    <Modal
      title="Target language"
      open={showSetting}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Radio.Group defaultValue="ja">
        <Radio.Button value="ja">Japanese</Radio.Button>
        <Radio.Button value="en" disabled>
          English
        </Radio.Button>
      </Radio.Group>
    </Modal>
  );

  // Modal for question
  const handleQuestion = () => {
    setShowQuestion(true);
  };

  const question = (
    <Modal
      title="About"
      open={showQuestion}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h4>How to use?</h4>
      <p>(Content)</p>
      <p>(Content)</p>
      <p>(Content)</p>
      <p>(Content)</p>
      <p>(Content)</p>
    </Modal>
  );

  const actionIcons = [
    <SendOutlined onClick={handleSend} style={{ fontSize: "x-large" }} />,
    <CopyOutlined onClick={handleCopy} style={{ fontSize: "x-large" }} />,
    <ReloadOutlined onClick={handleReload} style={{ fontSize: "x-large" }} />,
    <SettingOutlined onClick={handleSetting} style={{ fontSize: "x-large" }} />,
    <QuestionCircleOutlined
      onClick={handleQuestion}
      style={{ fontSize: "x-large" }}
    />,
  ];

  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Content
          style={{
            height: "auto",
            margin: "5vh",
          }}
        >
          <Card
            bordered={false}
            title={
              <div style={{ textAlign: "center" }}>
                <h2 style={{ margin: 0, marginBottom: "0.25rem" }}>
                  anki mentor
                </h2>
                <p style={{ margin: 0, marginBottom: "0.25rem" }}>
                  *For experimental use only*
                </p>
              </div>
            }
            style={{
              height: "80vh",
            }}
            actions={actionIcons}
            extra={
              <a
                href="https://www.github.com/aaakul"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", fontSize: "large" }}
              >
                <GithubOutlined />
              </a>
            }
          >
            <Card
              type="inner"
              title={
                <div style={{ height: "50vh", width: "auto" }}>
                  <pre id="output">
                    {responseText ||
                      "Enter words you want to memorize into tags below..."}
                  </pre>
                </div>
              }
            >
              <TagEditor initialTags={[]} maxTags={10} onChange={setTags} />
            </Card>
          </Card>
          {setting}
          {question}
        </Content>
        <Footer
          style={{
            textAlign: "center",
            height: "10vh",
          }}
        >
          <a
            style={{ color: "inherit" }}
            href="https://ant-design.antgroup.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Space>
              Made with antd and
              <HeartFilled />
            </Space>
          </a>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
