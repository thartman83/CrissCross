import './App.css';
import SquareGrid from '@/components/layouts/squareGrid/squareGrid';
import CrosswordContextProvider from '@/context/crosswordContext';
import AppContextProvider from '@/context/applicationContext';
import TabLayout from '@/components/layouts/tablayout';
import WordListContextProvider from '@/context/wordListContext';
import Modals from '@/components/layouts/modals';
import PageLayout from '@/components/layouts/pageLayout';
import Header from '@/components/layouts/header/header';
import MainMenu from '@/components/layouts/mainMenu';

function App() {
  return (
      <AppContextProvider>
        <CrosswordContextProvider>
          <WordListContextProvider>
            <Header />
            <MainMenu />
            <PageLayout >
              <SquareGrid />
              <TabLayout />
            </PageLayout>
            <Modals />
          </WordListContextProvider>
        </CrosswordContextProvider>
      </AppContextProvider>
  );
}

export default App;
