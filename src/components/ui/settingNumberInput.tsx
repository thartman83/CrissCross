import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SettingChangeEvent = ChangeEvent<HTMLInputElement>;

const SettingNumberInput = ({label, name, defaultValue, updater}:
                      {label: string, name: string, defaultValue: any,
                       updater: Dispatch<SetStateAction<number>>}) =>
{
  const onChangeHandler = (e: SettingChangeEvent) => {
    const val = Number(e.currentTarget.value);
    updater(val);
  };
  return (
    <div className="setting-group">
      <label className="setting-label" htmlFor={name}>{label}</label>
      <input className="setting-input" name={name} type="number"
        defaultValue={defaultValue}
        onChange={onChangeHandler} />
    </div>
  );
};

export default SettingNumberInput;
