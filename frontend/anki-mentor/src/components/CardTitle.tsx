import React from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

interface CardTitleProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

const CardTitle: React.FC<CardTitleProps> = ({
  isDarkTheme,
  onToggleTheme,
}) => {
  // display version information
  let subtitle: string;
  switch (process.env.REACT_APP_ENV) {
    case "preview":
      subtitle = "*Demo version*";
      break;
    case "development":
      subtitle = "*Development version*";
      break;
    case "production":
      subtitle = "*For experimental use only*";
      break;
    default:
      subtitle = "*UNKNOWN ENVIRONMENT*";
      break;
  }

  return (
    <div className="card-title-container">
      <div className="toggle-theme" onClick={onToggleTheme}>
        {isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
      </div>
      <div className="titles">
        <h2>anki mentor</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default CardTitle;
