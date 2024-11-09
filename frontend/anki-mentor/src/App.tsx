import React, { useState } from "react";
import { ConfigProvider, theme, RadioChangeEvent } from "antd";
import Layout, { Content } from "antd/es/layout/layout";
import SettingModal from "./components/SettingModal";
import QuestionModal from "./components/QuestionModal";
import MainCard from "./components/MainCard";
import MyFooter from "./components/MyFooter";
import useHandleSend from "./hooks/useHandleSend";
import useHandleCopy from "./hooks/useHandleCopy";
import ActionIcons from "./components/ActionIcons";
import useHandleReload from "./hooks/useHandleReload";

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
  // Switch theme
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const { handleSend } = useHandleSend({
    tags,
    lang,
    regenerate,
    setResponseText,
    setRegenerate,
  });

  // regenerate context
  const { handleReload } = useHandleReload({
    tags,
    responseText,
    regenerate,
    handleSend,
    setRegenerate,
  });

  const { handleCopy } = useHandleCopy({
    responseText,
  });

  // Modal Ok event
  const handleOk = () => {
    setShowSetting(false);
    setShowQuestion(false);
  };

  // display handleSettingModal
  const handleSetting = () => {
    setShowSetting(true);
  };

  const handleLangChange = (e: RadioChangeEvent) => {
    const newLang = e.target.value;
    setLang(newLang);
    setResponseText(
      `Enter ${newLang} words you want to memorize into tags below...`
    );
  };

  // display QuestionModal
  const handleQuestion = () => {
    setShowQuestion(true);
  };

  const actionIcons = ActionIcons({
    handleSend,
    handleCopy,
    handleReload,
    handleSetting,
    handleQuestion,
    regenerate,
  });

  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        // dark theme by default
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Content>
          <MainCard
            actionIcons={actionIcons}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
            responseText={responseText}
            tags={tags}
            setTags={setTags}
          />
          <SettingModal
            visible={showSetting}
            onOk={handleOk}
            onChange={handleLangChange}
          />
          <QuestionModal visible={showQuestion} onOk={handleOk} />
        </Content>
        <MyFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
