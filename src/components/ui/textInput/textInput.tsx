import { CSSProperties, ChangeEvent, ReactElement } from "react";
import "./textInput.css";

export type TextInputChangeEvent = ChangeEvent<HTMLInputElement>

export type TextInputProps = {
  defaultValue?: string,
  label?: string,
  rightIcon?: string | ReactElement,
  rightIconRotate?: number,
  placeholder?: string,
  changeHandler: (str: string) => void
};

const TextInput = ({label, defaultValue, changeHandler, rightIcon, rightIconRotate, placeholder}: TextInputProps) => {
  const rightIconEl = typeof rightIcon === 'string' ?
        <span className="icon-right" data-content={rightIcon}
              data-content-rotate={rightIconRotate} role="img"
              style={{'--data-content-rotate': `${rightIconRotate}deg`} as CSSProperties}/> :
  rightIcon;

  const onChangeHandler = (e: TextInputChangeEvent) => {
    changeHandler(e.target.value);
  };

  return (
    <div className="text-input-group">
      {label && <label className="text-input-label">{label}</label>}
      <input type="text" className="text-input" defaultValue={defaultValue}
             onChange={onChangeHandler} placeholder={placeholder}/>
      {rightIconEl}
    </div>
  );

};

export default TextInput;
