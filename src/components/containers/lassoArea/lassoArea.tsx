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
  const { selectArea } = useCrossword();

  const squareNoFromMouseEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const squareNo = Number(target?.closest('.grid-square')
                            ?.getAttribute('data-squareno') || -1);

    return squareNo;
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
      selectArea(startSquareNo, squareNo);
    }
  };

  const endDragHandler = (e: LassoMouseEvent) => {
    const squareNo = squareNoFromMouseEvent(e);
    selectArea(startSquareNo, squareNo);
    setIsDown(false);
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
