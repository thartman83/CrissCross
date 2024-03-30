import { KeyboardEvent, MouseEvent, ChangeEvent, useRef, useEffect } from "react";
import { useCrossword } from "../../context/crosswordContext";

type SquareArgs = {
  value: string,
  x: number,
  y: number,
  focus: boolean,
  highlight: boolean,
  wordNo: number,
};

type SquareKeyDownEvent = KeyboardEvent<HTMLInputElement>;
type SquareChangeEvent = ChangeEvent<HTMLInputElement>;
type SquareMouseEvent = MouseEvent<HTMLInputElement>;

const SquareInput = ({value, x, y, focus, highlight, wordNo}: SquareArgs) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(focus) {
      inputEl.current?.focus();
    }
  });

  const { onKeyDown, onClick } = useCrossword();

  // trap key events and fire them off to the crossword context for
  // processing
  const onKeyDownHandler = (e: SquareKeyDownEvent) => {
    onKeyDown(e);
    e.preventDefault();
  };

  // by default we don't want to do anything if we don't intend to
  // process it
  const onChangeHandler = (e: SquareChangeEvent) => {
    e.preventDefault();
  };

  // set the current position when an input is click
  const onClickHandler = (e: SquareMouseEvent) => {
    onClick(e);
    e.preventDefault();
  };

  // On double click switch the orientation of the cursor
  const onDoubleClickHandler = (e: SquareMouseEvent) => {
    onClick(e);
    e.preventDefault();
  };

  return (
    <>
      <label data-answerno={wordNo === 0 ? "" : wordNo} />
      <input value={value} type="text"
             className="grid-square"
             readOnly={value === '.'}
             data-xpos={x} data-ypos={y}
             maxLength={1}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             onClick={onClickHandler}
             onDoubleClick={onDoubleClickHandler}
             data-highlight={highlight}
             ref={inputEl}
      />
    </>
  );
};

export default SquareInput;
