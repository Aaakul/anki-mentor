import React from "react";
import {
  CopyOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

interface ActionIconsProps {
  handleSend: () => void;
  handleCopy: () => void;
  handleReload: () => void;
  handleSetting: () => void;
  handleQuestion: () => void;
  regenerate: boolean;
}

const ActionIcons = ({
  handleSend,
  handleCopy,
  handleReload,
  handleSetting,
  handleQuestion,
  regenerate,
}: ActionIconsProps): React.ReactNode[] => {
  const actionIcons = [
    <Tooltip title="Generate" zIndex={0}>
      <SendOutlined onClick={handleSend} disabled={regenerate} />
    </Tooltip>,
    <Tooltip title="Copy to clipboard" zIndex={0}>
      <CopyOutlined onClick={handleCopy} />
    </Tooltip>,
    <Tooltip title="Generate new article" zIndex={0}>
      <ReloadOutlined onClick={handleReload} disabled={regenerate} />
    </Tooltip>,
    <Tooltip title="Setting" zIndex={0}>
      <SettingOutlined onClick={handleSetting} />
    </Tooltip>,
    <Tooltip title="About" zIndex={0}>
      <QuestionCircleOutlined onClick={handleQuestion} />
    </Tooltip>,
  ];
  return actionIcons;
};

export default ActionIcons;
