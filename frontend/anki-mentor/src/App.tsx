import React, { useState } from "react";
import {
  CopyOutlined,
  SettingOutlined,
  ReloadOutlined,
  SendOutlined,
  HeartFilled,
  GithubOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Card,
  ConfigProvider,
  Space,
  theme,
  message,
  Radio,
  Modal,
  Tooltip,
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
  // Output language
  const [lang, setLang] = useState("Japanese");

  const handleSend = async () => {
    if (tags.length > 0) {
      const words = tags.join(",");
      if (process.env.REACT_APP_ENV === "preview") {
        const lorem: string =
          lang === "Japanese"
            ? "あら、蠍の火だなカムパネルラがまた何気なくしかるように叫びました。向こうとこっちの岸にね、おっかさんお話しなすったわ、そのとき出ているそらがそのまま楕円形のなかには涙がいっぱいに風に吹かれているらしく、無理に笑いながら男の子をジョバンニのポケットに入れました。もう涼しいからねジョバンニは立って窓をしめておこうかああ、どうか小さな人たちをだいて、それからしばらくしいんとしました。そしてしばらく木のある町を通って行くのでした。おっかさんが、ほんとうにもうそのまま胸にもつるされそうになり、天の川もまるで遠くへ行ったのだ。"
            : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias mollitia quibusdam quas est pariatur dignissimos hic atque reiciendis, sit, recusandae magnam, laudantium cupiditate voluptatum soluta. In natus ipsum minus veritatis.";
        setResponseText(`User input: ${words}; Lorem text: ${lorem} `);
      } else {
        try {
          const response = await axios.post<string, any>(
            process.env.REACT_APP_API_URL!,
            {
              words: words,
              language: lang,
            }
          );
          // Update output text
          setResponseText(response.data.response);
        } catch (error) {
          setResponseText(`Input:${words};Error:${error}`);
        }
      }
    }
  };

  const handleCopy = async () => {
    if (!responseText) return;
    // only allowed in TLS
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(responseText);
        message.success("Copied to clipboard");
      } catch (err) {
        console.error("Failed to copy:", err);
        message.error("Copy failed");
      }
    } else {
      // fallback method
      // hidden element
      const textarea = document.createElement("textarea");
      textarea.value = responseText;
      // Prevent scrolling to the bottom of the page
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        // simulates clipboard copying behavior
        document.execCommand("copy");
        message.success("Copied to clipboard");
      } catch (err) {
        console.error("Failed to copy:", err);
        message.error("Copy failed");
      }

      document.body.removeChild(textarea);
    }
  };

  const handleReload = () => {
    handleSend();
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
      <div>
        <p>Select the language of article</p>
        <Radio.Group
          defaultValue="Japanese"
          onChange={(e: RadioChangeEvent) => setLang(e.target.value)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Radio.Button value="Japanese">Japanese</Radio.Button>
          <Radio.Button value="English">English</Radio.Button>
        </Radio.Group>
      </div>
    </Modal>
  );

  // Modal for question
  const handleQuestion = () => {
    setShowQuestion(true);
  };

  const question = (
    <Modal
      title="How to use?"
      open={showQuestion}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>
        Click on the tag editor to add new words. For batch additions, separate
        each word with spaces, commas, or semicolons.
      </p>
      <p>
        Once you've added your desired words, click <SendOutlined /> to receive
        example essay based on your input.
      </p>
      <p>
        Click <CopyOutlined /> to paste text into your clipboard.
      </p>
      <p>
        Click <DeleteOutlined /> to clear entered words.
      </p>
      <p>
        If you need different content, simply click <ReloadOutlined />
      </p>
      <p>
        To change the language of the content, click <SettingOutlined />{" "}
        Currently, Japanese is supported.
      </p>
    </Modal>
  );

  const actionIcons = [
    <Tooltip title="Generate" zIndex={0}>
      <SendOutlined onClick={handleSend} style={{ fontSize: "x-large" }} />
    </Tooltip>,
    <Tooltip title="Copy to clipboard" zIndex={0}>
      <CopyOutlined onClick={handleCopy} style={{ fontSize: "x-large" }} />
    </Tooltip>,
    <Tooltip title="Generate new article" zIndex={0}>
      <ReloadOutlined onClick={handleReload} style={{ fontSize: "x-large" }} />
    </Tooltip>,
    <Tooltip title="Setting" zIndex={0}>
      <SettingOutlined
        onClick={handleSetting}
        style={{ fontSize: "x-large" }}
      />
    </Tooltip>,
    <Tooltip title="About" zIndex={0}>
      <QuestionCircleOutlined
        onClick={handleQuestion}
        style={{ fontSize: "x-large" }}
      />
    </Tooltip>,
  ];

  let subtitle;

  if (process.env.REACT_APP_ENV === "preview") {
    subtitle = "*Demo version*";
  } else if (process.env.REACT_APP_ENV === "development") {
    subtitle = "*Development version*";
  } else if (process.env.REACT_APP_ENV === "production") {
    subtitle = "*For experimental use only*";
  } else {
    subtitle = "UNKNOWN ENVIRONMENT";
  }

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
                <p style={{ margin: 0, marginBottom: "0.25rem" }}>{subtitle}</p>
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
