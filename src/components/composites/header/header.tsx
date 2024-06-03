import "./header.css";
import ToggleButton from "@/components/ui/toggleButton/toggleButton";

export type HeaderProps = {
  onClickHandler?: () => void
};

const Header = ({onClickHandler}: HeaderProps) => {
  const onToggleHandler = () => {
    onClickHandler && onClickHandler();
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
