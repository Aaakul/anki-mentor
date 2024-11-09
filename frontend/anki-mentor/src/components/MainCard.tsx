import React, { useState } from "react";
import { Card } from "antd";
import OutputCard from "./OutputCard";
import CardTitle from "./CardTitle";
import CardExtra from "./CardExtra";

interface MainCardProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  actionIcons: JSX.Element[];
}

const MainCard: React.FC<MainCardProps> = ({
  isDarkTheme,
  onToggleTheme,
  actionIcons,
}) => {
  // Output language
  const [lang, setLang] = useState<string>("Japanese");
  const [responseText, setResponseText] = useState<string>(
    `Enter ${lang} words you want to memorize into tags below...`
  );

  return (
    <Card
      bordered={false}
      title={<CardTitle isDarkTheme={true} onToggleTheme={onToggleTheme} />}
      style={{
        height: "80vh",
      }}
      actions={actionIcons}
      extra={<CardExtra />}
    >
      <OutputCard responseText={responseText} />
    </Card>
  );
};

export default MainCard;
