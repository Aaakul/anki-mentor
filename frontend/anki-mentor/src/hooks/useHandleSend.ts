import { useCallback } from "react";
import axios from "axios";

interface UseHandleSendProps {
  tags: string[];
  lang: string;
  regenerate: boolean;
  setResponseText: React.Dispatch<React.SetStateAction<string>>;
  setRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHandleSend = ({
  tags,
  lang,
  regenerate,
  setResponseText,
  setRegenerate,
}: UseHandleSendProps) => {
  const loremJP =
    "あら、蠍の火だなカムパネルラがまた何気なくしかないように叫びました。向こうとこっちの岸にね、おっかさんお話しなすったわ、そのとき出ているそらがそのまま楕円形のなかには涙がいっぱいに風に吹かれているらしく、無理に笑いながら男の子をジョバンニのポケットに入れました...";
  const loremEN =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias mollitia quibusdam quas est pariatur dignissimos hic atque reiciendis, sit, recusandae magnam, laudantium cupiditate voluptatum soluta. In natus ipsum minus veritatis.";

  const handleSend = useCallback(async () => {
    if (tags.length > 0) {
      const words = tags.join(",");
      if (process.env.REACT_APP_ENV === "preview") {
        const lorem = lang === "Japanese" ? loremJP : loremEN;
        setResponseText(
          `Words: ${words}; Regenerate: ${regenerate}; Lorem text: ${lorem};`
        );
      } else {
        try {
          const response = await axios.post<string, any>(
            process.env.REACT_APP_API_URL!,
            {
              words: words,
              language: lang,
              regenerate: regenerate,
            }
          );
          // update output
          setResponseText(response.data.response);
        } catch (error) {
          setResponseText(
            `User input: ${words}; Language: ${lang}; Regenerate: ${regenerate}; Error: ${error}`
          );
        }
      }
      setRegenerate(false); // reset regenerate state
    }
  }, [tags, setRegenerate, lang, setResponseText, regenerate]);

  return { handleSend };
};

export default useHandleSend;
