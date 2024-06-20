import ToggleSwitch from "@/components/ui/toggleSwitch/toggleSwitch";
import "./toggleSetting.css";

export type ToggleSettingProps = {
  label: string,
  defaultState: boolean,
  toggleHandler: (state: boolean) => void
};

const ToggleSetting = ({label, defaultState, toggleHandler}: ToggleSettingProps) => {
  return (
    <div className="setting">
      <label>
        {label}
        <ToggleSwitch defaultState={defaultState} toggleHandler={toggleHandler}/>
      </label>
    </div>
  );
};

export default ToggleSetting;
