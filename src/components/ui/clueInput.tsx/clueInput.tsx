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
};

const ClueInput = ({clueNo, clue, orientation, highlight, changeHandler}: ClueInputProps) => {
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

  return (
    <div className={"clue-group" + (highlight ? " highlight" : "")}>
      <div className="clue-mask" />
      <div className="clue-label">
        <label>{clueNo}</label>
      </div>
      <div className="grow-wrap" ref={growDiv}>
        <textarea defaultValue={clue} onChange={changeHandlerLocal}
                  rows={1}/>
      </div>
    </div>
  );
};

export default ClueInput;
