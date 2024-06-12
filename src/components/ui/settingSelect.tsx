import {ChangeEvent, Dispatch, SetStateAction } from 'react';

type SettingChangeEvent = ChangeEvent<HTMLSelectElement>;

const SettingSelect = ({label, name, defaultValue, options, updater}:
                       {label: string, name: string, defaultValue: string,
                        options: string[],
                        updater: Dispatch<SetStateAction<string>>}) =>
{
  const onChangeHandler = (e: SettingChangeEvent) => {
    updater(e.currentTarget.value);
  };

  return (
    <div className="setting-group">
      <label className="setting-label" htmlFor={name}>{label}</label>
      <select className="setting-select" id={name} name={name}
              defaultValue={defaultValue} onChange={onChangeHandler}>
        {
          options.map((opt: string, _) => {
            return <option key={`opt-${name}-${opt}`}value={opt}>{opt}</option>;
          })
        }
      </select>
    </div>);
};

export default SettingSelect;
