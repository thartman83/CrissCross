import Modal, { ModalSize } from "@/components/containers/modal/modal";
import "./settingsModal.css";
import ToggleSetting from "@/components/composites/toggleSetting/toggleSetting";

export type SettingsModalProps = {
  isModalOpen: boolean,
  closeModalHandler: () => void,
};

const SettingsModal = ({isModalOpen, closeModalHandler}: SettingsModalProps) => {
  return (
    <Modal title="Settings" size={ModalSize.Medium} isOpen={isModalOpen}
           closeModalHandler={closeModalHandler}>
      <ToggleSetting label="Dark Mode" defaultState={false} />
      <ToggleSetting label="Auto Save" defaultState={false} />
    </Modal>
  );
};

export default SettingsModal;
