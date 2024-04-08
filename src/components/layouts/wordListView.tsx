import { useEffect, useState, ChangeEvent, ReactNode } from "react";
import { useWordList } from "../../context/wordListContext";
import SearchInput from "../ui/searchInput";
import './wordlistView.css';
import useCurrentWord from "../../hooks/useCurrentWord";

type ChangeSearchEvent = ChangeEvent<HTMLInputElement>;

const WordListView = () => {
  const {wordList} = useWordList();
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentWords, setCurrentWords] = useState<Array<ReactNode>>([]);
  const [remainingFiltered, setRemainingFiltered] = useState<number>(0);

  const currentWord = useCurrentWord();

  useEffect(() => {
    const filteredWords = wordList
          .filter(({word}: {word: string}) =>
            word.includes(currentFilter.toUpperCase()) &&
              word.length === currentWord.length &&
              currentWord.reduce((acc: boolean, val: string, i: number): boolean =>
                acc && (val === '' || val === word[i]), true))
          .sort((a: {word: string, value: number},
                 b: {word: string, value: number}) => b.value - a.value);

    const wordEls = filteredWords.slice(0,25).map(
      (entry: {word: string, value: number}) => {
        return <div key={`${entry.word}-word-entry`} className="wordlist-word">
                 <label>{`${entry.word} (${entry.word.length})`}</label>
                 <label className="wordlist-wordvalue">
                   {entry.value}
                 </label>
               </div>;
      }, [currentWord]);

    setCurrentWords(wordEls);
    setRemainingFiltered(filteredWords.length - 25 > 0 ?
                         filteredWords.length - 25 : 0);
  }, [currentFilter,currentWord]);

  const onSearchInputChanged = (event: ChangeSearchEvent) => {
    setCurrentFilter(event.currentTarget.value);
  };

  return (
    <>
      <div className="word-list">
        <SearchInput onChangeHandler={onSearchInputChanged}/>
        {currentWords}
        {remainingFiltered != 0 &&
         (
           <label className="remaining-words">
             -- {remainingFiltered} Remaining Words --
           </label>)}
      </div>
    </>
  );
};

export default WordListView;
