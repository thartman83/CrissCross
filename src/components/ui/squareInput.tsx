import { KeyboardEvent, ChangeEvent } from 'react';
import { useEffect, useRef } from "react";
import { useCrossword, MoveDirection } from "../../context/crosswordContext";

type SquareArgs = {
  value: string,
  x: number,
  y: number,
  focus: boolean,
  highlight: boolean,
  wordNo: number,
};

type SquareKeyDown = KeyboardEvent<HTMLInputElement>;
type SquareChangeEvent = ChangeEvent<HTMLInputElement>;

const SquareInput = ({value, x, y, focus, highlight, wordNo}: SquareArgs) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(focus) {
      inputEl.current?.focus();
    }
  });

  const {updateFill, movePosition, toggleOrientation, deleteFill,
         toggleBlock} = useCrossword();

  // trap key events and fire them off to the crossword context for
  // processing
  const onKeyDownHandler = (e: SquareKeyDown) => {

    // Probably a better way of handling this than a massive switch
    // block consider moving to a dictionary map
    const key = e.key.toUpperCase();

    // all letters and numbers are valid
    if(/[A-Z0-9]/.test(key) && e.key.length === 1) {
      updateFill(x, y, key);
      e.preventDefault();
    } else if(key === '.') {
      toggleBlock(x, y);
      e.preventDefault();
    } else if(key === 'ARROWRIGHT') {
      movePosition(x, y+1, MoveDirection.RIGHT);
    } else if(key === 'ARROWLEFT') {
      movePosition(x, y-1, MoveDirection.LEFT);
    } else if(key === 'ARROWUP') {
      movePosition(x-1, y, MoveDirection.UP);
    } else if(key === 'ARROWDOWN') {
      movePosition(x+1, y, MoveDirection.DOWN);
    } else if(key === ' ') {
      toggleOrientation();
    } else if (key === 'DELETE' || key === 'BACKSPACE') {
      deleteFill(x, y);
      e.preventDefault();
    }
  };

  // by default we don't want to do anything if we don't intend to
  // process it
  const onChangeHandler = (e: SquareChangeEvent) => {
    e.preventDefault();
  };

  // set the current position when an input is click
  const onClickHandler = () => {
    movePosition(x, y, MoveDirection.JUMP);
  };

  // On double click switch the orientation of the cursor
  const onDoubleClickHandler = () => {
    toggleOrientation();
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
