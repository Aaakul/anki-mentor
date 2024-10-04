import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Flex, Input, Tag, theme, Tooltip } from "antd";

// Modified from Ant Design's demo
// View docs on https://ant-design.antgroup.com/components/tag

interface TagEditorProps {
  initialTags?: string[];
  maxTags?: number;
  onChange?: (newTags: string[]) => void;
}

const TagEditor: React.FC<TagEditorProps> = ({
  initialTags = [],
  maxTags = 10,
  onChange,
}) => {
  const { token } = theme.useToken(); // Get style config
  const [tags, setTags] = useState<string[]>(initialTags); // Store current tags
  const [inputVisible, setInputVisible] = useState(false); // Control input visibility
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [editInputIndex, setEditInputIndex] = useState(-1); // Current edit tag index
  const [editInputValue, setEditInputValue] = useState(""); // Edit input field value
  const inputRef = useRef<InputRef>(null); // Reference to the input element
  const editInputRef = useRef<InputRef>(null); // Reference to the edit input element

  const TagInputStyle: React.CSSProperties = {
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const TagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  // Focus input when visible
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  // Focus edit input when visible
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onChange && onChange(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  // Update input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    const values = splitAndTrim(inputValue); // Split and trim input value
    const filteredValues = values.filter(
      (value) => value && !tags.includes(value)
    );
    if (
      filteredValues.length > 0 &&
      tags.length + filteredValues.length <= maxTags
    ) {
      setTags([...tags, ...filteredValues]); // Add new tags
      onChange && onChange([...tags, ...filteredValues]);
    }
    setInputVisible(false); // Hide input
    setInputValue(""); // Clear input value
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value); // Update edit input value
  };

  const handleEditInputConfirm = () => {
    const values = splitAndTrim(editInputValue); // Split and trim edit input value
    const filteredValue = values[0];
    if (filteredValue) {
      const newTags = [...tags];
      newTags[editInputIndex] = filteredValue; // Update tag
      setTags(newTags);
      onChange && onChange(newTags);
    }
    setEditInputIndex(-1); // Reset edit index
    setEditInputValue(""); // Clear edit input value
  };

  const splitAndTrim = (value: string): string[] => {
    return value
      .split(/[,;　，；、]/) // Match comma, semicolon, and their full-width forms
      .map((v) => v.trim()) // Trim spaces
      .filter((v) => v !== ""); // Filter out empty strings
  };

  return (
    <Flex wrap>
      {tags.map<React.ReactNode>((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              style={TagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index >= 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          style={TagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={TagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New word
        </Tag>
      )}
    </Flex>
  );
};

export default TagEditor;
