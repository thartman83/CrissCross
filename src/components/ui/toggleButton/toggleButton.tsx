import { useState } from "react";
import "./toggleButton.css";
import { GetIconByName } from "@/components/ui/faIcons";

export type ToggleButtonProps = {
  name: string,
  faIcon: string,
  faIconAlt?: string,
  label?: string,
  state?: boolean,
  onToggleHandler?: (state: boolean) => void
};

const ToggleButton = (toggleBtnProps: ToggleButtonProps) => {
  const {name, faIcon, faIconAlt, label, state, onToggleHandler} = toggleBtnProps;
  const Icon = GetIconByName(faIcon);
  const AltIcon = faIconAlt ? GetIconByName(faIconAlt) : Icon;
  const [isChecked, setIsChecked] = useState(!!state);

  const onChangeHandler = () => {
    if(onToggleHandler)
      onToggleHandler(!isChecked);

    setIsChecked(!isChecked);
  };

  return (
    <div className="toggle-button">
      <input id={name} type="checkbox" checked={isChecked}
             onChange={onChangeHandler}
             aria-label={label} />
      <label htmlFor={name} aria-hidden="true"
             className={isChecked && faIconAlt === undefined ? "checked" : ""}>
        {isChecked ? AltIcon : Icon}
      </label>
    </div>
  );
};

export default ToggleButton;
