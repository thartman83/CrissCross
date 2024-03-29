import { useState } from 'react';
import './App.css';
import GridLayout from "./components/layouts/gridLayout";
import HelpModal from './components/layouts/helpModal.tsx';
import CrosswordContextProvider from './context/crosswordContext.tsx';

function App() {
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const onHelpButtonClickHandler = () => {
    setOpenHelpModal(!openHelpModal);
  };

  const onSettingsClickHandler = () => {
    setOpenSettingsModal(!openSettingsModal);
  };

  return (
    <>
      <div className='header'>CrissCross
        <div className='header-icons'>
          <button title="undo">&#8634;</button>
          <button onClick={onSettingsClickHandler} title="settings">&#9881;</button>
          <button onClick={onHelpButtonClickHandler}>?</button>
        </div>
      </div>
      <div className='main'>
        <CrosswordContextProvider>
          <GridLayout/>
        </CrosswordContextProvider>
      </div>
      <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal}/>
    </>
  );
}

export default App;
