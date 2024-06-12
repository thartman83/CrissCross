import { ChangeEvent } from "react";
import "./textInput.css";

export type TextInputChangeEvent = ChangeEvent<HTMLInputElement>

export type TextInputProps = {
  label: string,
  defaultValue: string,
  onChangeHandler: (e: TextInputChangeEvent) => void
};

const TextInput = ({label, defaultValue, onChangeHandler}: TextInputProps) =>
      (
        <div className="text-input-group">
          <label className="text-input-label">{label}</label>
          <input type="text" className="text-input" defaultValue={defaultValue}
                 onChange={onChangeHandler} />
        </div>
);

export default TextInput;
