import { ReactElement, useState, MouseEvent } from "react";
import "./lassoArea.css";
import { useCrossword } from "@/context/crosswordContext";

export type LassoMouseEvent = MouseEvent<HTMLDivElement>
export type MouseCoords = [number, number];

export type LassoAreaProps = {
  startSelection: (e: LassoMouseEvent) => void
  endSelection: (e: LassoMouseEvent) => void
  children: ReactElement | ReactElement[] | null,
};

const LassoArea = ({children}: LassoAreaProps) => {
  const [ isDown, setIsDown ] = useState<boolean>(false);

  const [ startSquareNo, setStartSquareNo ] = useState<number>(-1);
  const { selectArea, crossword } = useCrossword();

  const width = crossword.width;

  const squareNoFromMouseEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const squareNo = Number(target?.closest('.grid-square')
                            ?.getAttribute('data-squareno') || -1);

    return squareNo;
  };

  const getLassoAreaCoords = (startPos: number, endPos: number) => {
    debugger;
    // endPos is down and to the right
    if(endPos > startPos && (endPos % width) > (startPos % width))
      return [startPos, endPos];
    // endPos is up and to the left
    else if(endPos < startPos && (endPos % width) < (startPos % width))
      return [endPos, startPos];
    // endPos is down and to the left
    else if(endPos > startPos && (endPos % width) < (startPos % width))
      return [Math.floor(startPos / width) * width + (endPos % width),
              (startPos % width) + Math.floor(endPos / width) * width];
    // endPos is up and to the right
    else
      return [Math.floor(endPos / width) * width + (startPos % width),
              (endPos % width) + Math.floor(startPos / width) * width];
  };

  const beginDragHandler = (e: LassoMouseEvent) => {
    setIsDown(true);
    const squareNo = squareNoFromMouseEvent(e);
    if(squareNo !== -1)
      setStartSquareNo(squareNo);
  };

  const dragHandler = (e: LassoMouseEvent) => {
    if(isDown) {
      const squareNo = squareNoFromMouseEvent(e);
      const coords = getLassoAreaCoords(startSquareNo, squareNo);
      selectArea(coords[0], coords[1]);
    }
  };

  const endDragHandler = (e: LassoMouseEvent) => {
    setIsDown(false);
    e.stopPropagation();
  };

  const blurHandler = () => {
    setIsDown(false);
  };

  return (
    <div className="lasso-zone" onMouseDown={beginDragHandler}
         onMouseUp={endDragHandler} onMouseMove={dragHandler}
         onBlur={blurHandler}>

      {children}
    </div>
  );
};

export default LassoArea;
