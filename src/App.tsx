import './App.css';
import GridLayout from "./components/layouts/gridLayout";
import CrosswordContextProvider from './context/crosswordContext';
import AppContextProvider from './context/applicationContext';
import TabLayout from './components/layouts/tablayout';
import WordListContextProvider from './context/wordListContext';
import Modals from './components/layouts/modals';
import PageLayout from './components/layouts/pageLayout';
import MainMenuButton from './components/ui/mainMenuButton';
import HeaderLayout from './components/layouts/headerLayout';
import MainLayout from './components/layouts/mainLayout';
import MainMenu from './components/layouts/mainMenu';

function App() {
  return (
      <AppContextProvider>
        <CrosswordContextProvider>
          <WordListContextProvider>
            <PageLayout>
              <MainMenu />
              <HeaderLayout>
                <MainMenuButton />
                <h3>Criss/Cross</h3>
              </HeaderLayout>
              <MainLayout>
                <GridLayout />
                <TabLayout />
              </MainLayout>
            </PageLayout>
            <Modals />
          </WordListContextProvider>
        </CrosswordContextProvider>
      </AppContextProvider>
  );
}

export default App;
