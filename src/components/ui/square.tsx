import { ChangeEvent, Dispatch, useEffect, useRef } from "react";
import Grid, { SquareState } from "../../types/grid";
import { GridActions, GridReducerPayload } from "../../state/gridContext";

type SquareArgs = {
  value: string,
  x: number,
  y: number,
  state: SquareState,
  autofocus: boolean,
  answerNo: number,
  gridDispatch: Dispatch<Grid>,
  current: boolean
};

const SquareInput = ({value, state, x, y, answerNo, gridDispatch, autofocus, current}: SquareArgs) => {

  const inputEl = useRef(null);

  useEffect(() => {
    if(autofocus) {
      inputEl.current?.focus();
    }
  });

  const onChangeHandler = (_: ChangeEvent) => {
  };

  const onKeyDownHandler = (e: KeyboardEvent) => {

    const el: HTMLInputElement = e.target;
    const x = el.attributes['data-xpos'].value;
    const y = el.attributes['data-ypos'].value;

    const payload: GridReducerPayload = {
      x: x,
      y: y,
      value: e.key
    };

    const key = e.key.toUpperCase();

    if(/[A-Z0-9]/.test(key) && e.key.length === 1) {
      gridDispatch({ type: GridActions.updateFill, payload: payload});
      e.preventDefault();
    } else if(e.key === '.') {
      gridDispatch({ type: GridActions.toggleBlock, payload: payload});
      e.preventDefault();
    } else if(key === 'BACKSPACE'
              || key === 'DELETE') {
      payload.value = '';
      gridDispatch({ type: GridActions.deleteFill, payload: {
        x: x, y: y, value: e?.target?.value
      }});
    } else if (key === 'ARROWRIGHT') {
      gridDispatch({ type: GridActions.moveright});
    } else if (key === 'ARROWLEFT') {
      gridDispatch({ type: GridActions.moveleft });
    } else if (key === 'ARROWUP') {
      gridDispatch({ type: GridActions.moveup});
    } else if (key === 'ARROWDOWN') {
      gridDispatch({ type: GridActions.movedown});
    } else if (key === ' ') {
      gridDispatch({ type: GridActions.toggleOrientation});
    } else if (key === 'TAB') {
      gridDispatch({ type: GridActions.nextWord});
      e.preventDefault();
    }
  };

  const onClickHandler = (_: any) => {
    gridDispatch({ type: GridActions.click, payload: {x:x, y:y}});
  };

  const onDoubleClickHandler = (_, any) => {
    gridDispatch({type: GridActions.toggleOrientation});
  };

  return (
    <>
      <label data-answerno={answerNo === 0 ? "" : answerNo}
             data-current={current} />
      <input value={value} type="text"
             className="grid-square"
             readOnly={state == SquareState.Block}
             data-xpos={x} data-ypos={y}
             maxLength={1}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             onClick={onClickHandler}
             onDoubleClick={onDoubleClickHandler}
             ref={inputEl}
             data-current={current}
      />
    </>
  );
};

export default SquareInput;
