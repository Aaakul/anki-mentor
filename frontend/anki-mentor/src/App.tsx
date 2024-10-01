import React, { useEffect, useRef, useState } from "react";
import {
  CopyOutlined,
  PlusOutlined,
  SettingOutlined,
  ReloadOutlined,
  SendOutlined,
  HeartFilled,
  GithubOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
import {
  Card,
  ConfigProvider,
  Flex,
  Input,
  Space,
  Tag,
  theme,
  Tooltip,
} from "antd";
import Layout, { Content, Footer } from "antd/es/layout/layout";

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 24,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const editor = (
    <Flex wrap>
      {tags.map<React.ReactNode>((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="large"
              style={tagInputStyle}
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
            closable={index !== 0}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
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
          size="large"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Word
        </Tag>
      )}
    </Flex>
  );

  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Content
          style={{
            height: "auto",
            margin: "5vh",
          }}
        >
          <Card
            bordered={false}
            title={<h2 style={{ textAlign: "center" }}>anki mentor</h2>}
            style={{
              height: "80vh",
            }}
            actions={[
              <SendOutlined key="send" />,
              <CopyOutlined key="copy" />,
              <ReloadOutlined key="reload" />,
              <SettingOutlined key="setting" />,
            ]}
            extra={
              <a
                href="https://www.github.com/aaakul"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <GithubOutlined />
              </a>
            }
          >
            <Card
              type="inner"
              title={
                <div
                  style={{ height: "50vh", width: "auto" }}
                  className="output"
                >
                  <h4>Enter words you want to memorize into tags below...</h4>
                </div>
              }
            >
              {editor}
            </Card>
          </Card>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            height: "10vh",
          }}
        >
          <a
            style={{ color: "inherit" }}
            href="https://ant-design.antgroup.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Space>
              Made with Ant Design and
              <HeartFilled />
            </Space>
          </a>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
