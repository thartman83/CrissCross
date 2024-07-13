import { useEffect, useState } from 'react';
import WordListView from "@/components/layouts/wordListView/wordListView";
import { WordList, WordListWord, useWordList } from "@/context/wordListContext";
import { TabPanelProps } from "../tabPanel/tabPanel";
import { useCrossword } from '@/context/crosswordContext';

export type WordListContainerProps = TabPanelProps & {
};

const WordListContainer = ({hidden, id, labeledBy}: WordListContainerProps) => {

  const { crossword, updateCurrentWord } = useCrossword();
  const { wordListByLen } = useWordList();
  const [ curWordList, setCurWordList ] = useState<WordList>(wordListByLen[15]);


  const selectWordHandler = (w: WordListWord) => {
    updateCurrentWord(w.word);
  };

  useEffect(() => {
    const currentWord = crossword.currentWord();
    const curRegex = currentWord.squares.reduce(
      (acc,c) => c === '' ? acc + '.' : acc + c, "^");
    const len = currentWord.squares.length
    setCurWordList(wordListByLen[len].filter( w => w.word.match(curRegex)));
  }, [crossword]);

  return (
    <WordListView hidden={hidden} id={id} labeledBy={labeledBy}
                  wordList={curWordList}
                  wordSelectedHandler={selectWordHandler} />

  );
};

export default WordListContainer;
