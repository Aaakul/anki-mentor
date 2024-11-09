import React from "react";
import { Modal, Radio, RadioChangeEvent } from "antd";

interface SettingModalProps {
  visible: boolean;
  onOk: () => void;
  onChange: (e: RadioChangeEvent) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onOk,
  onChange,
}) => {
  return (
    <Modal
      title="Target language"
      open={visible}
      onOk={onOk}
      cancelButtonProps={{ style: { visibility: "hidden" } }}
    >
      <div className="radio-container">
        <p>Select the language of article</p>
        <Radio.Group
          defaultValue={"Japanese"}
          onChange={onChange}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Radio.Button value="Japanese">Japanese</Radio.Button>
          <Radio.Button value="English">English</Radio.Button>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default SettingModal;
