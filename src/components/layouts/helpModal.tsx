import Modal from "./modal";
import "./helpModal.css";

const HelpModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {

  const children = <>
                     <ul className="help-commands-list">
                       <li>
                         <div className="help-action">
                           <span className="help-key">.</span>
                         </div>
                         <span className="help-text">Toggle Block Square</span>
                       </li>
                       <li>
                         <div className="help-action">
                           <span className="help-key">space</span>
                         </div>
                         <span className="help-text">Toggle orientation</span>
                       </li>
                       <li>
                         <div className="help-action">
                           <span className="help-key">Ctrl</span>
                           <span className="help-key">Z</span>
                         </div>
                         <span className="help-text">Undo Last Action</span>
                       </li>
                     </ul>
                   </>;

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <Modal title="Grid Commands" isOpen={isOpen} children={children}
           closeModalHandler={closeModalHandler}/>
  );
};

export default HelpModal;
