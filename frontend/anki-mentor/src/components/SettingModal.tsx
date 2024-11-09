import React, { useState } from "react";
import { Modal, Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface SettingModalProps {
  visible: boolean;
  onOk: () => void;
  onLanguageChange: (lang: string) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onOk,
  onLanguageChange,
}) => {
  const [lang, setLang] = useState("Japanese");

  const handleLangChange = (e: RadioChangeEvent) => {
    setLang(e.target.value);
    onLanguageChange(e.target.value);
  };

  return (
    <Modal
      title="Target language"
      open={visible}
      onOk={onOk}
      cancelButtonProps={{ style: { visibility: "hidden" } }}
    >
      <div>
        <p>Select the language of article</p>
        <Radio.Group defaultValue="Japanese" onChange={handleLangChange}>
          <Radio.Button value="Japanese">Japanese</Radio.Button>
          <Radio.Button value="English">English</Radio.Button>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default SettingModal;
