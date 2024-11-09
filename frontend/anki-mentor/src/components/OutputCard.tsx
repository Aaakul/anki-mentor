import React, { useState } from "react";
import { Card } from "antd";
import TagEditor from "./TagEditor";

interface OutputCardProps {
  responseText: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ responseText }) => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <Card
      type="inner"
      title={
        <div style={{ height: "50vh", width: "auto" }}>
          <pre id="output">{responseText}</pre>
        </div>
      }
    >
      <TagEditor initialTags={[]} maxTags={10} onChange={setTags} />
    </Card>
  );
};

export default OutputCard;
