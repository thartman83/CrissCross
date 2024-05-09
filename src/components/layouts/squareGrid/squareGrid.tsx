import "./squareGrid.css";
import { MouseEvent, useRef } from "react";
import { useCrossword } from "@/hooks/useCrossword";
import Square from "@/components/ui/square/square";

type ClickEvent = MouseEvent<HTMLElement>;

const SquareGrid = () => {
  const { crossword, onClick, onDoubleClick } = useCrossword();
  const currentWord = crossword.currentWord();

  const gridWidthCssProp =
        { "--crossword-col-width": crossword.width,
          "--grid-square-size": `calc(var(--grid-width) / ${crossword.width})`,
        } as React.CSSProperties;

  const onClickHandler = (e: ClickEvent) => {
    const target = e.target as HTMLElement;
    const newPos = Number(target.getAttribute('data-squareno'));

    if(crossword.position === newPos) {
      onDoubleClick(newPos);
    } else {
      onClick(newPos);
    }
  };

  return (
    <div className="square-grid" style={{...gridWidthCssProp}}
         onClick={onClickHandler}>
      {
        crossword.grid.map((s,i) =>
          <Square key={"grid-square-" + i.toString()} value={s as string}
                  squareNo={i} focused={i === crossword.position}
                  currentWord={currentWord.indicies.includes(i)}
          />
        )
      }
    </div>
  );
};

export default SquareGrid;
