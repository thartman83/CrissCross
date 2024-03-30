import Modal from "./modal";
import "./helpModal.css";

const HelpModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {

  const children = <>
                     Grid Commands
                     <ul className="help-commands-list">
                       <li><span className="help-key">.</span>
                         Toggle Block Square</li>
                       <li><span className="help-key">space</span>
                         Toggle orientation
                       </li>
                     </ul>
                   </>;

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} children={children}
           closeModalHandler={closeModalHandler}/>
  );
};

export default HelpModal;
