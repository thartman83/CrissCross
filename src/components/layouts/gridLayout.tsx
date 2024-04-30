import "./gridLayout.css";
import SquareInput from "@/components/ui/squareInput/squareInput";
import useCrossword from "@/hooks/useCrossword";
import { answerGrid } from "@/utils/gridUtilities";
import ToolboxLayout from "./toolboxLayout";

export const GridLayout = () => {
  const {crossword} = useCrossword();

  // grid with corresponding word numbers for the grid
  const wordNos = answerGrid(crossword);

  // grid with the current word highlighted
  const currentWord = crossword.currentWord();

  return (
    <div className="grid-layout">
      <div className="grid">
        {
          crossword.gridView().map((row, i) =>
            <div className="grid-row" key={`grid-row-${i}`}>
              {
                row.map((val, j) => {
                  const pos = i * crossword.width + j;
                  return <SquareInput pos={pos} value={val}
                    key={`square-${pos}`}
                    focus={pos === crossword.position}
                    highlight={currentWord.indicies.includes(pos)}
                    wordNo={wordNos[i][j]}
                  />;
                })
              }
            </div>
          )
        }
      </div>
      <ToolboxLayout />
    </div>
  );
};

export default GridLayout;
