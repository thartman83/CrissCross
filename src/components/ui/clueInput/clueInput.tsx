import { ChangeEvent, useEffect, useRef } from "react";
import "./clueInput.css";
import Orientation from "@/types/orientation";

type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>

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
  };

  const focusHandlerLocal = () => {
    focusHandler(clueNo, orientation);
  };

  return (
    <label className={"clue-group" + (highlight ? " highlight" : "")}
         onClick={focusHandlerLocal}>
      <div className="clue-mask" />
      <div className="clue-label">
        {clueNo}
      </div>
      <div className="grow-wrap" ref={growDiv}>
        <textarea defaultValue={clue} onChange={changeHandlerLocal}
                  rows={1} onFocus={focusHandlerLocal}/>
      </div>
    </label>
  );
};

export default ClueInput;
