import Modal from "../containers/modal/modal";

interface ConfirmModalProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  title: string,
  confirmText: string,
  onOkayAction?: () => void,
  onCancelAction?: () => void,
};

const ConfirmModal = ({isOpen, setIsOpen, title, confirmText, onCancelAction}: ConfirmModalProps) => {

  const closeModalHandler = () => {
    if(typeof onCancelAction !== 'undefined')
      onCancelAction();

    setIsOpen(false);
  };

  return (
    <Modal title={title} isOpen={isOpen} closeModalHandler={closeModalHandler}>
      <div className="button-group">
        <div className="confirm-text">
          {confirmText}
        </div>
        <button className="btn">Ok</button>
        <button className="btn">Cancel</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
