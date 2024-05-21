import './wordlistView.css';
import { useEffect, useState, ChangeEvent, MouseEvent, ReactNode } from "react";
import { useWordList } from "../../context/wordListContext";
import SearchInput from "../ui/searchInput";
import { useCrossword } from '@/hooks/useCrossword';

type ChangeSearchEvent = ChangeEvent<HTMLInputElement>;
type EntryListClickEvent = MouseEvent<HTMLButtonElement>;

const WordListView = () => {
  const {wordList} = useWordList();
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentWords, setCurrentWords] = useState<Array<ReactNode>>([]);
  const [remainingFiltered, setRemainingFiltered] = useState<number>(0);
  const {updateCurrentWord} = useCrossword();

  const {crossword} = useCrossword();

  const onWordListItemClicked = (e: EntryListClickEvent) => {
    const value: string = e.currentTarget.getAttribute('data-word') || "";
    updateCurrentWord(value);
  };

  useEffect(() => {
    const currentWord = crossword.currentWord();
    const filteredWords = wordList
          .filter(({word}: {word: string}) =>
            word.includes(currentFilter.toUpperCase()) &&
              word.length === currentWord.squares.length &&
              currentWord.squares.reduce(
                (acc: boolean, val: string, i: number): boolean =>
                acc && (val === '' || val === word[i]), true))
          .sort((a: {word: string, value: number},
                 b: {word: string, value: number}) => b.value - a.value);

    const wordEls = filteredWords.slice(0,25).map(
      (entry: {word: string, value: number}) => {
        return <button key={`${entry.word}-word-entry`} className="wordlist-word"
                       data-word={entry.word}
                       onClick={onWordListItemClicked}>
                 <label>{`${entry.word} (${entry.word.length})`}</label>
                 <label className="wordlist-wordvalue">
                   {entry.value}
                 </label>
               </button>;
      }, [currentWord]);

    setCurrentWords(wordEls);
    setRemainingFiltered(filteredWords.length - 25 > 0 ?
                         filteredWords.length - 25 : 0);
  }, [currentFilter, crossword]);

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
