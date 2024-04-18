import "./toolboxLayout.css";
import MenuButton from "../ui/menuButton";
import {IconName} from "../ui/faIcons";
import { useCrossword } from "../../context/crosswordContext";

const ToolboxLayout = () => {

  const {undo} = useCrossword();

  const onToggleBlockClickHandler = () => {

  };

  const onUndoClickHandler = () => {
    undo();
  };

  return (
    <div className="toolbox">
      <MenuButton title="Undo" icon={IconName.RotateLeft}
                  onClickHandler={onUndoClickHandler} />
      <MenuButton title="Toggle Block Square" icon={IconName.Square}
                  onClickHandler={() => {}} />
      <MenuButton title="Toggle Highlight" icon={IconName.Circle}
                  onClickHandler={onToggleBlockClickHandler} />
      <MenuButton title="Enter Rebus" icon={IconName.Diamond}
                  onClickHandler={() => {}} />
      <MenuButton title="Lock Grid" icon={IconName.Lock}
                  onClickHandler={() => {}} />
      <MenuButton title="Change Grid Symmetry" icon={IconName.Bars}
                  onClickHandler={() => {}} />
      <MenuButton title="Autofill Grid" icon={IconName.WandSparkles}
                  onClickHandler={() => {}} />
    </div>
  );
};

export default ToolboxLayout;
