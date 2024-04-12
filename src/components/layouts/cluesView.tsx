import { useCrossword } from "../../context/crosswordContext";
import Orientation from "../../types/orientation";
import "./cluesView.css";

const CluesView = () => {
  const {crossword} = useCrossword();
  const words = crossword.wordView();

  const acrosses = words.filter(word => word.orientation === Orientation.across);
  const downs = words.filter(word => word.orientation === Orientation.down);

  return (
    <>
      <div className="clues-view">
        <div className="clues-set">
          Acrosses
          <ul className="clues-list">
            {
              acrosses.map(word =>
                <li key={`word-across-${word.wordNo}`}>
                  {word.wordNo + ". " + word.squares.join('')}
                </li>)
            }
          </ul>
        </div>
        <div className="clues-set">
          Downs
          <ul className="clues-list">
            {
              downs.map(word =>
                <li key={`word-down-${word.wordNo}`}>
                  {word.wordNo + ". " + word.squares.join('')}
                </li>)
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default CluesView;
