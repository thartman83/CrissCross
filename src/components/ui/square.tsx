import { ChangeEvent, Dispatch } from "react";
import Grid from "../../types/grid";
import { SquareState } from "../../types/square";
import { GridActions, GridReducerPayload } from "../../state/gridContext";

type SquareArgs = {
  value: string,
  x: number,
  y: number,
  state: SquareState,
  answerNo: number,
  gridDispatch: Dispatch<Grid>
};

const SquareInput = ({value, state, x, y, answerNo, gridDispatch}: SquareArgs) => {

  const onChangeHandler = (e: ChangeEvent) => {
    // const el: Element = e.target;
    // const x = el.attributes['data-xpos'].value;
    // const y = el.attributes['data-ypos'].value;

    // const payload: GridReducerPayload = {
    //   x: x,
    //   y: y,
    //   value: el.value
    // };

    // gridDispatch({type: GridActions.keyDown, payload: payload });

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

    if(/[A-Z0-9]/.test(e.key.toUpperCase())) {
      gridDispatch({ type: GridActions.updateFill, payload: payload});
      e.preventDefault();
    } else if(e.key === '.') {
      gridDispatch({ type: GridActions.toggleBlack, payload: payload});
      e.preventDefault();
    }

  };


  return (
    <>
      <label data-answerno={answerNo === 0 ? "" : answerNo} />
      <input value={value} type="text"
             className="grid-square"
             readOnly={state == SquareState.Black}
             data-xpos={x} data-ypos={y}
             maxLength={1}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
      />
    </>
  );
};

export default SquareInput;
