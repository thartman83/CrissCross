import Modal, { ModalSize } from "@/components/containers/modal/modal";
import "./settingsModal.css";
import ToggleSetting from "@/components/composites/toggleSetting/toggleSetting";
import useColorSchema from "@/hooks/useColorSchema";
import useAutoSave from "@/hooks/useAutoSave";

export type SettingsModalProps = {
  isOpen: boolean,
  closeModalHandler: () => void,
};

const SettingsModal = ({isOpen, closeModalHandler}: SettingsModalProps) => {
  const { darkMode, setDarkMode } = useColorSchema();
  const { autoSave, setAutoSave } = useAutoSave();

  return (
    <Modal title="Settings" size={ModalSize.Medium} isOpen={isOpen}
           closeModalHandler={closeModalHandler}>
      <ToggleSetting label="Dark Mode" defaultState={darkMode}
                     toggleHandler={setDarkMode}/>
      <ToggleSetting label="Auto Save" defaultState={autoSave}
                     toggleHandler={setAutoSave}/>
    </Modal>
  );
};

export default SettingsModal;
