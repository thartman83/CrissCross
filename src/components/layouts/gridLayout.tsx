import Grid, { Square } from "../../types/grid";
import SquareInput from "../ui/square";
import CurrentWord from "./currentWord";

export const GridLayout = ({ grid, dispatch }: { grid: Grid; dispatch: any; }) => {
  const squareInCurrentWord = (x: number, y: number) => {
    if(grid.currentWordIdx === -1)
      return false;

    const currentWord = grid.words[grid.currentWordIdx];
    return currentWord.squares.findIndex((s: Square, _: number) => {
      return s.x === x && s.y === y;
    }) !== -1;
  };

  return <div className="grid">
    {grid.fill.map((_, i) => {
      return <div className='grid-row' key={`row-${i}`}>
        {grid.fill.map((_, j) => {
          const focus = (i == grid.xPos && j == grid.yPos);
          return <SquareInput x={i} y={j}
                              state={grid.fill[i][j].state}
                              value={grid.fill[i][j].value}
                              answerNo={grid.fill[i][j].answerNo}
                              key={`square-${i}x${j}`}
                              gridDispatch={dispatch}
                              autofocus={focus}
                              current={squareInCurrentWord(i,j)} />;
        })}
      </div>;
    })}
    <CurrentWord grid={grid} />
  </div>;
};

export default GridLayout;
