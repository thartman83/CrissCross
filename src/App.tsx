import { useState } from 'react';
import './App.css';
import GridLayout from "./components/layouts/gridLayout";
import HelpModal from './components/layouts/helpModal';
import SettingsModal from './components/layouts/settingsModal';
import CrosswordContextProvider from './context/crosswordContext';
import AppContextProvider from './context/applicationContext';
import TabLayout from './components/layouts/tablayout';

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
      <div className='header'>
        Criss/Cross
        <div className='header-icons'>
          <button title="undo">&#8634;</button>
          <button onClick={onSettingsClickHandler} title="settings">
            &#9881;</button>
          <button onClick={onHelpButtonClickHandler}>?</button>
        </div>
      </div>
      <div className='main'>
        <AppContextProvider>
          <CrosswordContextProvider>
            <GridLayout/>
            <TabLayout/>
          </CrosswordContextProvider>
          <HelpModal isOpen={openHelpModal} setIsOpen={setOpenHelpModal}/>
          <SettingsModal isOpen={openSettingsModal}
                         setIsOpen={setOpenSettingsModal} />
        </AppContextProvider>
      </div>
    </>
  );
}

export default App;
