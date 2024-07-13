import { createContext, useContext, ReactNode, useEffect, useState } from "react";

const wordListDictionary = '/src/assets/xwordlist.dict';

export type WordListWord = {
  word: string,
  value: number,
};

export type WordList = WordListWord[];

type WordListContextType = {
  wordList: WordList,
  wordListByLen: WordList[],
  isLoading: boolean
};

const WordListContext = createContext<WordListContextType>({
  wordList:[],
  wordListByLen:[],
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
  const [wordListByLen, setWordListByLen] = useState<WordList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(wordListDictionary).then((r) => r.text()).then(text => {
      const newWordList = text.split('\n').map((e: string) => {
        const parts = e.split(';');
        return {
          word: parts[0],
          value: Number(parts[1])
        };
      });

      setWordList(newWordList);

      const listsByLen: WordList[] = [];
      newWordList.forEach((w) => {
        const len = w.word.length;
        typeof listsByLen[len] === 'undefined' ? listsByLen[len] = [w] :
          listsByLen[len].push(w);
      });

      const sortedListsByLen = listsByLen.map((i) => i.sort(
        (a,b) => a.value > b.value ? -1 : 1));
      setWordListByLen(sortedListsByLen);
      setIsLoading(false);
    });
  },[]);

  return (
    <WordListContext.Provider value={{wordList, wordListByLen, isLoading}}>
      {children}
    </WordListContext.Provider>
  );
};

export default WordListContextProvider;
