import { useApp } from "../../context/applicationContext";
import ConfirmModal from "./confirmModal";
import HelpModal from "./helpModal";
import NewModal from "./newModal";

const Modals = () => {
  const {openHelpModal, setOpenHelpModal,
         openNewModal, setOpenNewModal,
         openConfirmModal, setOpenConfirmModal } = useApp();
  return <>
           <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal} />
           {/* <SettingsModal isOpen={openSettingsModal} */}
           {/*    setIsOpen={setOpenSettingsModal} /> */}
           <NewModal isOpen={openNewModal} setIsOpen={setOpenNewModal} />
           <ConfirmModal isOpen={openConfirmModal} setIsOpen={setOpenConfirmModal}
                         confirmText="Are you sure you want to?"
           title=""/>
         </>;
};

export default Modals;
