import { useEffect, useRef } from "react";
import { GetIconByName } from "../faIcons";
import "./menuItem.css";

export interface MenuItemProps {
  text: string,
  onClickHandler: () => void
  faIcon?: string,
  focused: boolean,
};

const MenuItem = ({text, onClickHandler, faIcon, focused}: MenuItemProps) => {
  const icon = faIcon ? GetIconByName(faIcon) : null;
  const focusRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if(focused) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focused]);

  return (
    <li className="menu-item" onClick={onClickHandler} role="menuitem"
        ref={focusRef} tabIndex={focused ? 0 : -1}>
      {icon}
      {text}
    </li>
  );
};

export default MenuItem;
