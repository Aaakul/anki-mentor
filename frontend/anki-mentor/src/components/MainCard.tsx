import React from "react";
import { Card } from "antd";
import OutputCard from "./OutputCard";
import CardTitle from "./CardTitle";
import CardExtra from "./CardExtra";

interface MainCardProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  actionIcons: React.ReactNode[];
  responseText: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const MainCard: React.FC<MainCardProps> = ({
  isDarkTheme,
  onToggleTheme,
  actionIcons,
  responseText,
  tags,
  setTags,
}) => {
  return (
    <Card
      className="main-card"
      bordered={false}
      title={
        <CardTitle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
      }
      actions={actionIcons}
      extra={<CardExtra />}
    >
      <OutputCard tags={tags} setTags={setTags} responseText={responseText} />
    </Card>
  );
};

export default MainCard;
