import "./menuButton.css";
import { MouseEvent } from "react";
import IconByName, { IconName } from "./faIcons";

type ButtonClickEvent = MouseEvent<HTMLButtonElement>;

interface MenuButtonProps {
  title: string,
  icon: IconName,
  onClickHandler: (e: ButtonClickEvent) => void,
};

const MenuButton = ({title, icon, onClickHandler}: MenuButtonProps) => {
  return (

      <button className="menu-btn" onClick={onClickHandler} title={title}>
        {IconByName(icon)}
      </button>
  );
};

export default MenuButton;
