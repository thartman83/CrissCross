import "./toggleButton.css";
import { GetIconByName } from "@/components/ui/faIcons";

export type ToggleButtonProps = {
  name: string,
  faIcon: string,
  faIconAlt?: string,
  label?: string,
  state?: boolean,
  onToggleHandler?: () => void,
};

const ToggleButton = (toggleBtnProps: ToggleButtonProps) => {
  const {name, faIcon, faIconAlt, label, state, onToggleHandler} = toggleBtnProps;
  const Icon = GetIconByName(faIcon);
  const AltIcon = faIconAlt ? GetIconByName(faIconAlt) : Icon;

  const onChangeHandler = () => {
    if(onToggleHandler)
      onToggleHandler();
  };

  return (
    <div className="toggle-button">
      <input id={name} type="checkbox" checked={state && state}
             onChange={onChangeHandler}
             aria-label={label} />
      <label htmlFor={name} aria-hidden="true"
             className={state && faIconAlt === undefined ? "checked" : ""}
             role="button">
        {state ? AltIcon : Icon}
      </label>
    </div>
  );
};

export default ToggleButton;
