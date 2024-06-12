import { ChangeEvent } from "react";
import "./textArea.css";

export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>

export type TextAreaProps = {
  label: string,
  defaultValue: string,
  onChangeHandler: (e: TextAreaChangeEvent) => void
};

const TextArea = ({label, defaultValue, onChangeHandler}: TextAreaProps) => {
  return (
    <div className="textarea-group">
      <label className="textarea-label">{label}</label>
      <textarea className="textarea" onChange={onChangeHandler}
                defaultValue={defaultValue} />
    </div>
  );
};

export default TextArea;
