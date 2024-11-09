import { useCallback, useEffect } from "react";

interface UseHandleReloadProps {
  tags: string[];
  responseText: string;
  regenerate: boolean;
  handleSend: () => void;
  setRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHandleReload = ({
  tags,
  responseText,
  regenerate,
  handleSend,
  setRegenerate,
}: UseHandleReloadProps) => {
  const handleReload = useCallback(async () => {
    if (tags.length > 0 && !responseText.endsWith("into tags below...")) {
      setRegenerate(true);
    }
  }, [tags.length, responseText, setRegenerate]);

  // only recreate handleSend when needed
  useEffect(() => {
    if (regenerate) {
      handleSend(); // wait handleSend
    }
  }, [regenerate, handleSend]);

  return { handleReload };
};

export default useHandleReload;
