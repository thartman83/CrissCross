import { ChangeEvent } from "react";
import "./toggleSwitch.css";

type ChangeCheckboxEvent = ChangeEvent<HTMLInputElement>

export type ToggleSwitchProps = {
  defaultState: boolean,
  toggleHandler: (state: boolean) => void
};

const ToggleSwitch = ({defaultState, toggleHandler}: ToggleSwitchProps) => {
  const changeHandler = (e: ChangeCheckboxEvent) => {
    toggleHandler(e.target.checked);
  };

  return (
    <div className="toggle-switch-group" >
      <input type="checkbox" defaultChecked={defaultState}
             onChange={changeHandler}/>
      <span aria-hidden="true" />
    </div>
  );
};

export default ToggleSwitch;
