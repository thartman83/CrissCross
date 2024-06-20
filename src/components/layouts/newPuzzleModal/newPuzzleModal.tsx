import { useCrossword } from "@/context/crosswordContext";
import "./newPuzzleModal.css";
import Modal from '@/components/containers/modal/modal';

export type NewPuzzleModalProps = {
  isOpen: boolean,
  closeModalHandler: () => void,
};

const NewPuzzleModal = ({isOpen, closeModalHandler}: NewPuzzleModalProps) => {
  const { onNew } = useCrossword();

  return (
    <Modal title="New Crossword" isOpen={isOpen}
           closeModalHandler={closeModalHandler}>
      <ul className="newpuzzle-list">
        <li className="newpuzzle-item"
            onClick={() => { onNew(15,15); closeModalHandler(); }}>
          <img src="src/assets/15x15xword.png" width={"50px"} height={"50px"}/>
          <h3>Full Crossword (15x15)</h3>
        </li>
        <li className="newpuzzle-item"
            onClick={() => { onNew(10,10); closeModalHandler(); }}>
          <img src="src/assets/10x10xword.png" width={"50px"} height={"50px"}/>
          <h3>Midi Crossword (10x10)</h3>
        </li>
        <li className="newpuzzle-item"
            onClick={() => { onNew(5,5); closeModalHandler(); }}>
          <img src="src/assets/5x5xword.png" width={"50px"} height={"50px"}/>
          <h3>Mini Crossword (5x5)</h3>
        </li>
      </ul>
    </Modal>
  );
};

export default NewPuzzleModal;
