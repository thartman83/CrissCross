import "./header.css";
import { useApp } from "@/context/applicationContext";
import ToggleButton from "@/components/ui/toggleButton/toggleButton";

export type HeaderProps = {};

const Header = (_: HeaderProps) => {
  const { setOpenMainMenu } = useApp();

  const onToggleHandler = (open: boolean) => {
    setOpenMainMenu(open);
  };

  return (
    <div className="header">
      <ToggleButton faIcon="Bars" name="main-menu"
                    onToggleHandler={onToggleHandler}/>
      <h3>Criss/Cross</h3>
    </div>
  );
};

export default Header;
