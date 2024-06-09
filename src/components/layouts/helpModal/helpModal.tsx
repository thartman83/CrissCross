import "./helpModal.css";
import Modal from "@/components/layouts/modal/modal";
import HelpKey from "@/components/ui/helpKey/helpKey";

export type HelpModalProps = {
  isOpen: boolean,
};

const HelpModal = ({isOpen}: HelpModalProps) => {
  return (
    <Modal title="Grid Commands" isOpen={isOpen}>
      <ul className="help-commands-list">
        <li>
          <div className="help-action">
            <HelpKey label="." />
          </div>
          <span className="help-text">Toggle Block Square</span>
        </li>
        <li>
          <div className="help-action">
            <HelpKey label="space" />
          </div>
          <span className="help-text">Toggle orientation</span>
        </li>
        <li>
          <div className="help-action">
            <HelpKey label="Ctrl" />
            <HelpKey label="Z" />
          </div>
          <span className="help-text">Undo Last Action</span>
        </li>
      </ul>
    </Modal>
  );
};

export default HelpModal;
