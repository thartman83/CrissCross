import Grid, { Orientation, Word } from "../../types/grid";

const ClueLayout = ({grid}: {grid: Grid}) => {

  const acrossSorted = grid.words.filter((word: Word) =>
    word.orientation === Orientation.across).sort((a,b) => {
      return a.wordNo < b.wordNo ? -1 : 1;
    });

  const acrossEls = acrossSorted.map( (word: Word, _) => {
    return <li key={`across-clue-${word.wordNo}`}>
             {word.wordNo}
           </li>;
  });

  const downSorted = grid.words.filter((word: Word) =>
    word.orientation === Orientation.down).sort((a,b) =>
      a.wordNo < b.wordNo ? -1 : 1);

  const downEls = downSorted.map( (word: Word, _) => {
    return <li key={`across-clue-${word.wordNo}`}>
             {word.wordNo}
           </li>;
  });

  return (
    <div className="clue-layout">
      <div className="clues-list-group across-clues">
        <h3>Across</h3>
        <ul className="clues-list">
          {acrossEls}
        </ul>
      </div>
      <div className="clues-list-group down-clues">
        <h3>Down</h3>
        <ul className="clues-list">
          {downEls}
        </ul>
      </div>
    </div>
  );
};

export default ClueLayout;
