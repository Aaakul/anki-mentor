import { message } from "antd";
import { useCallback } from "react";

interface UseHandleCopyProps {
  responseText: string;
}

const useHandleCopy = ({ responseText }: UseHandleCopyProps) => {
  const handleCopy = useCallback(async () => {
    if (!responseText || responseText.endsWith("into tags below...")) return;
    try {
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(responseText);
      } else {
        // fallback method
        // hidden element
        const textarea = document.createElement("textarea");
        textarea.value = responseText;
        // prevent scrolling to the bottom of the page
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      message.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
      message.error("Copy failed");
    }
  }, [responseText]);

  return { handleCopy };
};

export default useHandleCopy;
