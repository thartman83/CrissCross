import Grid from "../../types/grid";
import SquareInput from "../ui/square";
import CurrentWord from "./currentWord";

const GridLayout = ({grid, dispatch}: {grid: Grid, dispatch: any}) => {
  return <div className="grid">
           {
             grid.fill.map((_,i) => {
               return <div className='grid-row' key={`row-${i}`}>
                        {
                          grid.fill.map((_, j) => {
                            const focus = (i == grid.xPos && j == grid.yPos);
                            return <SquareInput x={i} y={j}
                                                state={grid.fill[i][j].state}
                                                value={grid.fill[i][j].value}
                                                answerNo={grid.fill[i][j].answerNo}
                                                key={`square-${i}x${j}`}
                                                gridDispatch={dispatch}
                                                autofocus={focus}
                                                current={grid.fill[i][j].current}
                                   />;
                          })
                        }
                      </div>;
             })
           }
           <CurrentWord grid={grid} />
         </div>;
};

export default GridLayout;
