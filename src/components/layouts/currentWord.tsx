import Grid, { Orientation, Square } from "../../types/grid";

const CurrentWord = ({grid}: {grid: Grid}) => {

  if(grid.currentWordIdx === -1) {
    return <div className="currentWord-layout"/>;
  }

  const currentWord = grid.words[grid.currentWordIdx];
  const orientationStr = currentWord.orientation == Orientation.across ?
        'Across' : 'Down';

  const inputEls = currentWord.squares.map((square: Square, i: number) => {
    return <input className="word-square" key={"current-word-square" + i}
                  defaultValue={grid.fill[square.x][square.y].value} />;
  });

  return (
    <div className="currentWord-layout">
      <span>{`${currentWord.wordNo}. ${orientationStr}`}</span>
      <span className="currentWord-word">{inputEls}</span>
      <span>({currentWord.squares.length})</span>
    </div>
  );
};

export default CurrentWord;
