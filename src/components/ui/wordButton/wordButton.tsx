import { WordListWord } from "@/context/wordListContext";
import "./wordButton.css";

export type WordButtonProps = {
  word: WordListWord,
  selectHandler: (word: WordListWord) => void,
};

const WordButton = ({word, selectHandler}: WordButtonProps) => {

  const onSelect = () => {
    selectHandler(word);
  };

  return (
    <div className="word-button-group">
      <button className="word-button" onClick={onSelect}>
        <span className="word-button-word">{word.word}</span>
        <span className="word-button-value">{word.value}</span>
      </button>
    </div>
  );
};

export default WordButton;
