import "./squareGrid.css";
import { MouseEvent, KeyboardEvent } from "react";
import { useCrossword } from "@/hooks/useCrossword";
import Square from "@/components/ui/square/square";
import { answerGrid } from "@/utils/gridUtilities";

type ClickEvent = MouseEvent<HTMLElement>
type KeyEvent = KeyboardEvent<HTMLElement>

const SquareGrid = () => {
  const { crossword, onClick, onDoubleClick, onKeyDown } = useCrossword();
  const currentWord = crossword.currentWord();
  const wordNos = answerGrid(crossword).flat();

  const gridWidthCssProp =
        { "--crossword-col-width": crossword.width,
          "--grid-square-size": `calc(var(--grid-width) / ${crossword.width})`,
        } as React.CSSProperties;

  const onClickHandler = (e: ClickEvent) => {
    const target = e.target as HTMLElement;
    const newPos = Number(target?.closest('.grid-square')
                          ?.getAttribute('data-squareno') || 0);

    if(crossword.position === newPos) {
      onDoubleClick(newPos);
    } else {
      onClick(newPos);
    }
  };

  const onKeyDownHandler = (e: KeyEvent) => {
    onKeyDown(e);
  };

  return (
    <div className="square-grid" style={{...gridWidthCssProp}}
         onClick={onClickHandler} onKeyDown={onKeyDownHandler} tabIndex={-1}
         role="region" aria-label="grid">
      {
        crossword.grid.map((s,i) =>
          <Square key={"grid-square-" + i.toString()} value={s as string}
                  squareNo={i} focused={i === crossword.position}
                  currentWord={currentWord.indicies.includes(i)}
                  wordNo={wordNos[i]}
          />
        )
      }
    </div>
  );
};

export default SquareGrid;
