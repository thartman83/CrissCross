import { useState } from 'react';
import './App.css';
import GridLayout from "./components/layouts/gridLayout";
import HelpModal from './components/layouts/helpModal';
import SettingsModal from './components/layouts/settingsModal';
import CrosswordContextProvider from './context/crosswordContext';
import AppContextProvider from './context/applicationContext';
import TabLayout from './components/layouts/tablayout';
import WordListContextProvider from './context/wordListContext';
import NewModal from './components/layouts/newModal';

function App() {
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);

  const onHelpButtonClickHandler = () => {
    setOpenHelpModal(!openHelpModal);
  };

  const onSettingsClickHandler = () => {
    setOpenSettingsModal(!openSettingsModal);
  };

  const onNewClickHandler = () => {
    setOpenNewModal(!openNewModal);
  };

  return (
    <>
      <div className='header'>
        Criss/Cross
        <div className='header-icons'>
          <button title="Undo">&#8634;</button>
          <button onClick={onNewClickHandler} title="new">&#43;</button>
          <button onClick={onSettingsClickHandler} title="settings">
            &#9881;</button>
          <button onClick={onHelpButtonClickHandler}>?</button>
        </div>
      </div>
      <div className='main'>
        <AppContextProvider>
          <CrosswordContextProvider>
            <WordListContextProvider>
              <GridLayout />
              <TabLayout />
            </WordListContextProvider>
            <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal} />
            <SettingsModal isOpen={openSettingsModal}
              setIsOpen={setOpenSettingsModal} />
            <NewModal isOpen={openNewModal} setIsOpen={setOpenNewModal} />
          </CrosswordContextProvider>
        </AppContextProvider>
      </div>

    </>
  );
}

export default App;
