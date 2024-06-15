import "./header.css";
import { MouseEvent } from "react";
import ToggleButton from "@/components/ui/toggleButton/toggleButton";

export type OnClickHandlerEvent = MouseEvent<HTMLDivElement>

export type HeaderProps = {
  openMainMenu: boolean,
  onClickHandler: () => void
};

const Header = ({openMainMenu, onClickHandler}: HeaderProps) => {

  const mouseDownHandler = (e: OnClickHandlerEvent) => {

    // if the main menu is open we will let the blur event handle
    // closing the menu
    if(!openMainMenu) {
      e.preventDefault();
      onClickHandler();
    }
  };

  const clickHandler = (e: OnClickHandlerEvent) => {
    // because the order of mouse events is MouseDown, blur, MouseUp,
    // Click we never want a click event to go out and possibly quash
    // the blur event.
    e.preventDefault();
  };

  return (
    <div className="header">
      <div className="header-brand"
           onMouseDown={mouseDownHandler}
           onClick={clickHandler}>
        <ToggleButton faIcon="Bars" name="main-menu"
                      state={openMainMenu} />
        <img src="src/assets/crisscross.png" role="button" />
      </div>
    </div>
  );
};

export default Header;
