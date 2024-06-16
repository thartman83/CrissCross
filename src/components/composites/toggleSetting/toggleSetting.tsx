import ToggleSwitch from "@/components/ui/toggleSwitch/toggleSwitch";
import "./toggleSetting.css";

export type ToggleSettingProps = {
  label: string,
  defaultState: boolean,
};

const ToggleSetting = ({label, defaultState}: ToggleSettingProps) => {
  return (
    <div className="setting">
      <label>
        {label}
        <ToggleSwitch defaultState={defaultState}/>
      </label>
    </div>
  );
};

export default ToggleSetting;
