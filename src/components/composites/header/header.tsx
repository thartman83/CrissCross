import "./header.css";
import { MouseEvent } from "react";
import ToggleButton from "@/components/ui/toggleButton/toggleButton";

export type OnClickHandlerEvent = MouseEvent<HTMLDivElement>

export type HeaderProps = {
  openMainMenu: boolean,
  onClickHandler: () => void
};

const Header = ({openMainMenu, onClickHandler}: HeaderProps) => {
  const onToggleHandler = (e: OnClickHandlerEvent) => {
    onClickHandler();
    e.preventDefault();
  };

  return (
    <div className="header">
      <div className="header-brand" onClick={onToggleHandler}>
        <ToggleButton faIcon="Bars" name="main-menu"
                      state={openMainMenu} />
        <img src="src/assets/crisscross.png" role="button" />
      </div>
    </div>
  );
};

export default Header;
