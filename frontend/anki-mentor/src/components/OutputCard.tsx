import React from "react";
import { Card } from "antd";
import TagEditor from "./TagEditor";

interface OutputCardProps {
  responseText: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const OutputCard: React.FC<OutputCardProps> = ({
  responseText,
  tags,
  setTags,
}) => {
  return (
    <Card
      type="inner"
      title={
        <div className="output-container">
          <pre className="output-text">{responseText}</pre>
        </div>
      }
    >
      <TagEditor initialTags={tags} maxTags={10} onChange={setTags} />
    </Card>
  );
};

export default OutputCard;
