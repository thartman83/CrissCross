import "./modal.css";
import { useState, useEffect, useRef } from "react";

export enum ModalSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
};

export type ModalProps = {
  title: string,
  isOpen: boolean,
  children: React.ReactNode,
  size?: ModalSize,
  closeModalHandler?: () => void
};

const Modal = ({title, isOpen, children, closeModalHandler, size}: ModalProps) => {
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
    <dialog ref={modalRef} className={"modal " + size}
            onClick={closeModalHandler}>
      <div className="modal-header">
        {title}
        <button className="modal-closebtn" onClick={closeModalHandler}>
          &times;
        </button>
      </div>
      <div className="modal-contents">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
