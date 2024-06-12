import "./subMenuButton.css";
import { MouseEvent, ReactElement, useState } from "react";
import IconByName, { IconName } from "./faIcons";

export enum ExpandDirection {
  ExpandBelow = 'expand-below',
  ExpandRight = 'expand-right',
};

interface SubMenuButtonProps {
  title: string,
  icon: IconName,
  children: ReactElement[] | ReactElement,
  expandDirection: ExpandDirection,
};

type ButtonClickEvent = MouseEvent<HTMLButtonElement>;

const SubMenuButton = ({title, icon, children, expandDirection}: SubMenuButtonProps) => {

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const onSubMenuClickHandler = (_: ButtonClickEvent) => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className={"btn-submenu-group" }>
      <button className={'menu-btn' + (subMenuOpen ? ' btn-on': '')}
              title={title} onClick={onSubMenuClickHandler}>
        {IconByName(icon)}
      </button>
      <div className={`btn-submenu ${expandDirection}` +
                      (subMenuOpen ? ' show' : ' collapse')}>
        {children}
      </div>

    </div>
  );
};

export default SubMenuButton;
