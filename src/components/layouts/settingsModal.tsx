import { useState } from "react";
import { useApp } from "../../context/applicationContext";
import Modal from "./modal";
import SettingNumberInput from "../ui/settingNumberInput";
import SettingSelect from "../ui/settingSelect";
import { GridSymmetry } from "../../types/appSettings";

const SettingsModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {

  const app = useApp();
  const [height, setHeight] = useState(app.appSettings.height);
  const [width, setWidth] = useState(app.appSettings.width);

  const children =
    <>
      <SettingNumberInput name="gridHeight" label="Grid Height"
                    defaultValue={height} updater={setHeight} />
      <SettingNumberInput name="gridWidth" label="Grid Width"
                          defaultValue={width} updater={setWidth} />
      <SettingSelect name="symmetryType" label="Grid Symmetry"
                     options={Object.keys(GridSymmetry)}
                     defaultValue="bar" updater={() => {}} />
    </>;

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <Modal title="Settings" isOpen={isOpen} children={children}
           closeModalHandler={closeModalHandler} />
  );
};

export default SettingsModal;
