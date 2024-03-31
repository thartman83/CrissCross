import { useState, useEffect, useRef } from "react";

type ModalProps = {
  title: string,
  isOpen: boolean,
  children: React.ReactNode;
  closeModalHandler: () => void;
};

const Modal = ({title, isOpen, children, closeModalHandler}: ModalProps) => {
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
      <h3>{title}</h3>
      {children}
    </dialog>
  );
};

export default Modal;
