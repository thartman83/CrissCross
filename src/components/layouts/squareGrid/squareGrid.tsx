import "./squareGrid.css";
import { MouseEvent, KeyboardEvent } from "react";
import { useCrossword } from "@/hooks/useCrossword";
import Square from "@/components/ui/square/square";
import { answerGrid, errorGrid } from "@/utils/gridUtilities";

type ClickEvent = MouseEvent<HTMLElement>
type KeyEvent = KeyboardEvent<HTMLElement>

const SquareGrid = () => {
  const { crossword, onClick, onDoubleClick, onKeyDown} = useCrossword();
  const currentWord = crossword.currentWord();
  const wordNos = answerGrid(crossword).flat();
  const errors = errorGrid(crossword);
  const selection = crossword.selection;

  const gridWidthCssProp =
        { "--crossword-col-width": crossword.width,
          "--grid-square-size": `calc(var(--grid-width) / ${crossword.width})`,
        } as React.CSSProperties;

  const clickHandler = (e: ClickEvent) => {
    const target = e.target as HTMLElement;
    const newPos = Number(target?.closest('.grid-square')
                          ?.getAttribute('data-squareno') || -1);

    if(crossword.position === newPos) {
      onDoubleClick(newPos);
    } else {
      onClick(newPos);
    }
  };

  const keyDownHandler = (e: KeyEvent) => {
    onKeyDown(e);
    e.preventDefault();
  };

  return (
    <div className="square-grid" style={{...gridWidthCssProp}}
         onMouseUp={clickHandler} onKeyDown={keyDownHandler} tabIndex={0}
         role="region" aria-label="grid">
      {
        crossword.grid.map((s,i) =>
          <Square key={"grid-square-" + i.toString()} value={s as string}
                  squareNo={i}
                  focused={i === crossword.position || selection?.includes(i)}
                  currentWord={(selection?.length === 0) &&
                               currentWord.indicies.includes(i)}
                  wordNo={wordNos[i]} error={errors[i]}
          />
        )
      }
    </div>
  );
};

export default SquareGrid;
