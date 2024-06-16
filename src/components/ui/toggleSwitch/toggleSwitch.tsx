import { v4 } from "uuid";
import "./toggleSwitch.css";

export type ToggleSwitchProps = {
  defaultState: boolean,
};

const ToggleSwitch = ({defaultState}: ToggleSwitchProps) => {
  const id = v4();
  return (
    <div className="toggle-switch-group" >
      <input type="checkbox" defaultChecked={defaultState} id={id}/>
      <label htmlFor={id}/>
    </div>
  );
};

export default ToggleSwitch;
