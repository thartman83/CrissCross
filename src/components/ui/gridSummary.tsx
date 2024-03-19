import Grid from "../../types/grid";
import Square, { SquareState } from "../../types/square";

const GridSummary = ({grid}: {grid: Grid}) => {
  const wordCount = grid.words.length;
  const averageWordLen = (grid.words.map((w) => w.squares.length).reduce((a,b) => a+b) / grid.words.length).toFixed(2);
  const squares = grid.fill.flat(Infinity);

  const blockCount = squares.filter((square: Square) => square.state == SquareState.Black).length;
  const numLetters = (grid.height * grid.width) - blockCount;

  return (
    <div className="grid-summary">
      <h3>Summary</h3>
      <ul className="general-grid-info">
        <li>Word Count: {wordCount}</li>
        <li>Average Word Length: {averageWordLen}</li>
        <li>Block Count: {blockCount}</li>
        <li>Number of Letters: {numLetters}</li>
      </ul>
    </div>
  );
};

export default GridSummary;
