import { useCrossword } from "../../context/crosswordContext";
import { getWordsView } from "../../utils/gridUtilities";
import "./cluesView.css";

const CluesView = () => {
  const {crossword} = useCrossword();
  const words = getWordsView(crossword);

  const acrossList = Object.keys(words.acrosses).map((num: string) => {
    return <li key={`word-across-${num}`}>
             {num + ". " + words.acrosses[num].join('')}
           </li>;
  });

  const downsList = Object.keys(words.downs).map((num: string) => {
    return <li key={`word-downs-${num}`}>
             {num + ". " + words.downs[num].join('')}
           </li>;
  });

  return (
    <>
      <div className="clues-view">
        <div className="clues-set">
          Acrosses
          <ul className="clues-list">
            { acrossList }
          </ul>
        </div>
        <div className="clues-set">
          Downs
          <ul className="clues-list">
            { downsList }
          </ul>
        </div>
      </div>
    </>
  );
};

export default CluesView;
