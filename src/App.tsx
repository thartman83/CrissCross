import './App.css';
import GridLayout from "./components/layouts/gridLayout";
import CrosswordContextProvider from './context/crosswordContext';
import AppContextProvider from './context/applicationContext';
import TabLayout from './components/layouts/tablayout';
import WordListContextProvider from './context/wordListContext';
import MainMenu from './components/layouts/mainMenu';
import Modals from './components/layouts/modals';

function App() {
  return (
    <>
      <AppContextProvider>
        <CrosswordContextProvider>
          <WordListContextProvider>
            <div className='header'>
              Criss/Cross
              <MainMenu />
            </div>
            <div className='main'>
              <GridLayout />
              <TabLayout />
              <Modals />
            </div>
          </WordListContextProvider>
        </CrosswordContextProvider>
      </AppContextProvider>
    </>
  );
}

export default App;
