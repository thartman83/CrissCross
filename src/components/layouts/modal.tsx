import { useState, useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean,
  children: React.ReactNode;
  closeModalHandler: () => void;
};

const Modal = ({isOpen, children, closeModalHandler}: ModalProps) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if(modalElement)
      isModalOpen ? modalElement.showModal() : modalElement.close();
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} className="modal" onClick={closeModalHandler}>
      {children}
    </dialog>
  );
};

export default Modal;
