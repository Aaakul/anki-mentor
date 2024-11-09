import React from "react";
import { Modal } from "antd";
import {
  SendOutlined,
  CopyOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface QuestionModalProps {
  visible: boolean;
  onOk: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ visible, onOk }) => {
  return (
    <Modal
      title="How to use?"
      open={visible}
      onOk={onOk}
      cancelButtonProps={{ style: { visibility: "hidden" } }}
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
};

export default QuestionModal;
