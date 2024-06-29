import { ChangeEvent, FocusEvent, useEffect, useRef, MouseEvent } from "react";
import "./clueInput.css";
import Orientation from "@/types/orientation";

type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>
type TextAreaFocusEvent = FocusEvent<HTMLElement>
type LabelClickEvent = MouseEvent<HTMLLabelElement>

export type ClueInputProps = {
  clueNo: number,
  orientation: Orientation,
  clue: string,
  highlight: boolean,
  changeHandler: (clueValue: string, clueNo: number,
                  orientation: Orientation) => void
  focusHandler: (clueNo: number, orientation: Orientation) => void
};

const ClueInput = ({clueNo, clue, orientation, highlight, changeHandler,
                    focusHandler}: ClueInputProps) => {
  const growDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(growDiv.current)
      growDiv.current.dataset.replicatedValue = clue;
  },[]);

  const changeHandlerLocal = (e: TextAreaChangeEvent) => {
    if(!growDiv.current)
      return;

    growDiv.current.dataset.replicatedValue = e.currentTarget.value;
    changeHandler(e.currentTarget.value, clueNo, orientation);
    e.preventDefault();
  };

  const focusHandlerLocal = (e: TextAreaFocusEvent) => {
    focusHandler(clueNo, orientation);
    e.preventDefault();
    console.log(e);
  };

  const clickHandlerLocal = (e: LabelClickEvent) => {
    focusHandler(clueNo, orientation);
    e.preventDefault();
    console.log(e);
  };

  return (
    <label className={"clue-group" + (highlight ? " highlight" : "")}
           onClick={clickHandlerLocal}>
      <div className="clue-mask" />
      <div className="clue-label">
        {clueNo}
      </div>
      <div className="grow-wrap" ref={growDiv}>
        <textarea defaultValue={clue} onChange={changeHandlerLocal}
                  rows={1} onFocus={focusHandlerLocal}
                  onClick={e => e.stopPropagation()}
        />
      </div>
    </label>
  );
};

export default ClueInput;
