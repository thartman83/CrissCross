import SquareInput from "../ui/squareInput";
import { useCrossword } from "../../context/crosswordContext";
import { answerGrid, currentWordGrid } from "../../utils/gridUtilities";

export const GridLayout = () => {
  const {crossword} = useCrossword();

  // grid with corresponding word numbers for the grid
  const wordNos = answerGrid(crossword);

  // grid with the current word highlighted
  const currentWord = currentWordGrid(crossword);

  return (
    <div className="grid">
      {
        crossword.grid.map((row, i) =>
          <div className="grid-row" key={`grid-row-${i}`}>
            {
              row.map((val, j) =>
                <SquareInput x={i} y={j} value={val} key={`square-${i}-${j}`}
                             focus={crossword.position.x == i &&
                                    crossword.position.y == j}
                             highlight={currentWord[i][j] == 1}
                             wordNo={wordNos[i][j]}
                />)
            }
          </div>
        )
      }
    </div>
  );
};

export default GridLayout;
