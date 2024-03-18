import { ChangeEvent, Dispatch, useEffect, useRef } from "react";
import Grid from "../../types/grid";
import { SquareState } from "../../types/square";
import { GridActions, GridReducerPayload } from "../../state/gridContext";

type SquareArgs = {
  value: string,
  x: number,
  y: number,
  state: SquareState,
  autofocus: boolean,
  answerNo: number,
  gridDispatch: Dispatch<Grid>
};

const SquareInput = ({value, state, x, y, answerNo, gridDispatch,
                      autofocus, current}: SquareArgs) => {

  const inputEl = useRef(null);

  useEffect(() => {
    if(autofocus) {
      inputEl.current?.focus();
    }
  });

  const onChangeHandler = (e: ChangeEvent) => {
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
      gridDispatch({ type: GridActions.toggleBlack, payload: payload});
      e.preventDefault();
    } else if(key === 'BACKSPACE'
              || key === 'DELETE') {
      payload.value = '';
      gridDispatch({ type: GridActions.deleteFill, payload: {
        x: x, y: y, value: e.target.value
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
    }
  };

  const onClickHandler = (e: any) => {
    gridDispatch({ type: GridActions.click, payload: {x:x, y:y}});
  };

  return (
    <>
      <label data-answerno={answerNo === 0 ? "" : answerNo}
             data-current={current} />
      <input value={value} type="text"
             className="grid-square"
             readOnly={state == SquareState.Black}
             data-xpos={x} data-ypos={y}
             maxLength={1}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             onClick={onClickHandler}
             ref={inputEl}
             data-current={current}
      />
    </>
  );
};

export default SquareInput;
