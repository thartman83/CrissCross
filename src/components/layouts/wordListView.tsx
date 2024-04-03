import { useEffect, useState, ChangeEvent, ReactNode } from "react";
import { useWordList } from "../../context/wordListContext";
import SearchInput from "../ui/searchInput";
import './wordlistView.css';

type ChangeSearchEvent = ChangeEvent<HTMLInputElement>;

const WordListView = () => {
  const {wordList} = useWordList();
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentWords, setCurrentWords] = useState<Array<ReactNode>>([]);
  const [remainingFiltered, setRemainingFiltered] = useState<number>(0);

  useEffect(() => {
    const filteredWords = wordList.filter(({word}: {word: string}) =>
      word.includes(currentFilter.toUpperCase()));

    const wordEls = filteredWords.slice(0,25).map(
      (entry: {word: string, value: number}) => {
        return <div key={`${entry.word}-word-entry`} className="wordlist-word">
                 <label>{`${entry.word} (${entry.word.length})`}</label>
                 <label className="wordlist-wordvalue">
                   {entry.value}
                 </label>
               </div>;
      });

    setCurrentWords(wordEls);
    setRemainingFiltered(filteredWords.length - 25 > 0 ?
                         filteredWords.length - 25 : 0);
  }, [currentFilter]);

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
