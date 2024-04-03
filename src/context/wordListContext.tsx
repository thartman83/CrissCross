import { createContext, useContext, ReactNode, useEffect, useState } from "react";

type WordList = {
  word: string,
  value: number
}[];

type WordListContextType = {
  wordList: WordList,
  isLoading: boolean
};

const WordListContext = createContext<WordListContextType>({
  wordList:[],
  isLoading: false
});

export const useWordList = () => {
  const ctx = useContext(WordListContext);
  if(!ctx) {
    throw new Error(
      "useWordList must be used within the WordListContext Provider."
    );
  }
  return ctx;
};

const WordListContextProvider = ({children}: {children: ReactNode}) => {
  const [wordList, setWordList] = useState<WordList>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/src/assets/xwordlist.dict').then((r) => r.text()).then(text => {
      const newWordList = text.split('\n').map((e: string) => {
        const parts = e.split(';');
        return {
          word: parts[0],
          value: Number(parts[1])
        };
      });

      setWordList(newWordList);
      setIsLoading(false);
    });
  },[]);

  return (
    <WordListContext.Provider value={{wordList, isLoading}}>
      {children}
    </WordListContext.Provider>
  );
};

export default WordListContextProvider;
