import { useReducer, useState } from 'react';
import './App.css';
import GridLayout from './components/layouts/gridLayout';
import GridSummary from './components/ui/gridSummary';
import gridReducer from './state/gridContext';
import { initGrid } from './utils/gridUtilities.ts';
import ClueLayout from './components/layouts/clueLayout.tsx';
import HelpModal from './components/layouts/helpModal.tsx';
import CurrentWord from './components/layouts/currentWord.tsx';

const defaultGridSize = 15;

function App() {
  const [grid, dispatch] = useReducer(gridReducer, initGrid(defaultGridSize,
                                                            defaultGridSize));

  const [openHelpModal, setOpenHelpModal] = useState(false);

  const onHelpButtonClickHandler = () => {
    setOpenHelpModal(!openHelpModal);
  };

  return (
    <>
      <div className='header'>CrissCross
        <div className='header-icons'>
          <button>&#10227;</button>
          <button onClick={onHelpButtonClickHandler}>?</button>
        </div>
      </div>
      <div className='main'>
        <GridLayout grid={grid} dispatch={dispatch} />
        <GridSummary grid={grid} />
      </div>
      <div className='clues'>
        <ClueLayout grid={grid} />
      </div>
      <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal}/>
    </>
  );
}

export default App;
