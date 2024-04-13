import { ChangeEvent } from "react";
import "./textArea.css";

export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

const TextArea = ({label, defaultValue, onChangeHandler}:
                  {label: string, defaultValue: string,
                   onChangeHandler: (e: TextAreaChangeEvent) => void}) => {
  return (
    <div className="textarea-group">
      <label className="textarea-label">{label}</label>
      <textarea className="textarea" onChange={onChangeHandler}>
        {defaultValue}
      </textarea>
    </div>
  );
};

export default TextArea;
