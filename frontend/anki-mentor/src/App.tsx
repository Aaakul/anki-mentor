import React, { useCallback, useEffect, useState } from "react";
import {
  CopyOutlined,
  SettingOutlined,
  ReloadOutlined,
  SendOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ConfigProvider, theme, message, Tooltip } from "antd";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import axios from "axios";
import SettingModal from "./components/SettingModal";
import QuestionModal from "./components/QuestionModal";
import MainCard from "./components/MainCard";
import MyFooter from "./components/MyFooter";

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  // Output language
  const [lang, setLang] = useState("Japanese");
  const [responseText, setResponseText] = useState(
    `Enter ${lang} words you want to memorize into tags below...`
  );
  const [regenerate, setRegenerate] = useState(false);
  // Modal visibility
  const [showSetting, setShowSetting] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const loremJP =
    "あら、蠍の火だなカムパネルラがまた何気なくしかないように叫びました。向こうとこっちの岸にね、おっかさんお話しなすったわ、そのとき出ているそらがそのまま楕円形のなかには涙がいっぱいに風に吹かれているらしく、無理に笑いながら男の子をジョバンニのポケットに入れました...";
  const loremEN =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias mollitia quibusdam quas est pariatur dignissimos hic atque reiciendis, sit, recusandae magnam, laudantium cupiditate voluptatum soluta. In natus ipsum minus veritatis.";

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSend = useCallback(async () => {
    if (tags.length > 0) {
      const words = tags.join(",");
      if (process.env.REACT_APP_ENV === "preview") {
        const lorem = lang === "Japanese" ? loremJP : loremEN;
        setResponseText(
          `Words: ${words}; Regenerate: ${regenerate}; Lorem text: ${lorem};`
        );
      } else {
        try {
          const response = await axios.post<string, any>(
            process.env.REACT_APP_API_URL!,
            {
              words: words,
              language: lang,
              regenerate: regenerate,
            }
          );
          // update output
          setResponseText(response.data.response);
        } catch (error) {
          setResponseText(
            `User input: ${words}; Language: ${lang}; Regenerate: ${regenerate}; Error: ${error}`
          );
        }
      }
      setRegenerate(false); // reset regenerate state
    }
  }, [tags, lang, regenerate]);

  // regenerate context
  const handleReload = useCallback(async () => {
    if (tags.length > 0 && !responseText.endsWith("into tags below...")) {
      setRegenerate(true);
    }
  }, [tags, responseText]);
  // only recreate handleSend when needed
  useEffect(() => {
    if (regenerate) {
      handleSend(); // wait handleSend
    }
  }, [regenerate, handleSend]);

  const handleCopy = useCallback(async () => {
    if (!responseText || responseText.endsWith("into tags below...")) return;
    try {
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(responseText);
      } else {
        // fallback method
        // hidden element
        const textarea = document.createElement("textarea");
        textarea.value = responseText;
        // prevent scrolling to the bottom of the page
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      message.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
      message.error("Copy failed");
    }
  }, [responseText]);

  const handleOk = () => {
    setShowSetting(false);
    setShowQuestion(false);
  };

  // Modal for settings
  const handleSetting = () => {
    setShowSetting(true);
  };

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    setResponseText(
      `Enter ${newLang} words you want to memorize into tags below...`
    );
  };

  // const setting = (
  //   <Modal
  //     title="Target language"
  //     open={showSetting}
  //     onOk={handleOk}
  //     cancelButtonProps={{ style: { visibility: "hidden" } }}
  //   >
  //     <div>
  //       <p>Select the language of article</p>
  //       <Radio.Group
  //         defaultValue="Japanese"
  //         onChange={handleLangChange}
  //         style={{ display: "flex", justifyContent: "center" }}
  //       >
  //         <Radio.Button value="Japanese">Japanese</Radio.Button>
  //         <Radio.Button value="English">English</Radio.Button>
  //       </Radio.Group>
  //     </div>
  //   </Modal>
  // );

  // Modal for question
  const handleQuestion = () => {
    setShowQuestion(true);
  };

  // const question = (
  //   <Modal
  //     title="How to use?"
  //     open={showQuestion}
  //     onOk={handleOk}
  //     cancelButtonProps={{ style: { visibility: "hidden" } }}
  //   >
  //     <p>
  //       Click on the tag editor to add new words. For batch additions, separate
  //       each word with spaces, commas, or semicolons.
  //     </p>
  //     <p>
  //       Once you've added your desired words, click <SendOutlined /> to receive
  //       example essay based on your input.
  //     </p>
  //     <p>
  //       Click <CopyOutlined /> to paste text into your clipboard.
  //     </p>
  //     <p>
  //       Click <DeleteOutlined /> to clear entered words.
  //     </p>
  //     <p>
  //       If you need different content, simply click <ReloadOutlined />
  //     </p>
  //     <p>
  //       To change the language of the content, click <SettingOutlined />{" "}
  //       Currently, Japanese is supported.
  //     </p>
  //   </Modal>
  // );

  const actionIcons = [
    <Tooltip title="Generate" zIndex={0}>
      <SendOutlined
        onClick={handleSend}
        disabled={regenerate}
        style={{ fontSize: "x-large" }}
      />
    </Tooltip>,
    <Tooltip title="Copy to clipboard" zIndex={0}>
      <CopyOutlined onClick={handleCopy} style={{ fontSize: "x-large" }} />
    </Tooltip>,
    <Tooltip title="Generate new article" zIndex={0}>
      <ReloadOutlined
        onClick={handleReload}
        disabled={regenerate}
        style={{ fontSize: "x-large" }}
      />
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

  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        // dark theme by default
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Content
          style={{
            height: "auto",
            margin: "5vh",
          }}
        >
          <MainCard
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
            actionIcons={actionIcons}
          />
          <SettingModal
            visible={showSetting}
            onOk={handleOk}
            onLanguageChange={handleLangChange}
          />
          <QuestionModal visible={showQuestion} onOk={handleOk} />
        </Content>
        <MyFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
