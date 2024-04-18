import "./mainMenuButton.css";
import { FaBars } from "./faIcons";
import { useApp } from "../../context/applicationContext";

const MainMenuButton = () => {
  const { openMainMenu, setOpenMainMenu } = useApp();

  const onMainMenuToggleClickHandler = () => {
    setOpenMainMenu(!openMainMenu);
  };

  return (
    <div className="main-menu-toggle">
      <input name="main-menu-toggle" id="main-menu-toggle" type="checkbox"
             onClick={onMainMenuToggleClickHandler} />
      <label htmlFor="main-menu-toggle"><FaBars/></label>
    </div>
  );
};

export default MainMenuButton;
