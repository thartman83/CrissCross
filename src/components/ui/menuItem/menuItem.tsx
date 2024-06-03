import { GetIconByName } from "../faIcons";
import "./menuItem.css";

export interface MenuItemProps {
  text: string,
  onClickHandler: () => void
  faIcon?: string,
};

const MenuItem = ({text, onClickHandler, faIcon}: MenuItemProps) => {
  const icon = faIcon ? GetIconByName(faIcon) : null;
  return (
    <li className="menu-item">
      {icon}
      <a href="#" onClick={onClickHandler}>
        {text}
      </a>
    </li>
  );
};

export default MenuItem;
