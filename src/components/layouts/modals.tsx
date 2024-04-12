import { useApp } from "../../context/applicationContext";
import HelpModal from "./helpModal";
import NewModal from "./newModal";

const Modals = () => {
  const {openHelpModal, setOpenHelpModal,
         openNewModal, setOpenNewModal } = useApp();
  return <>
           <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal} />
           {/* <SettingsModal isOpen={openSettingsModal} */}
           {/*    setIsOpen={setOpenSettingsModal} /> */}
           <NewModal isOpen={openNewModal} setIsOpen={setOpenNewModal} />
         </>;
};

export default Modals;
