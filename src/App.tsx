import './App.css';
import SquareGrid from '@/components/layouts/squareGrid/squareGrid';
import CrosswordContextProvider from '@/context/crosswordContext';
import TabLayout from '@/components/layouts/tabLayout/tabLayout';
import WordListContextProvider from '@/context/wordListContext';
import PageLayout from '@/components/containers/pageLayout/pageLayout';
import Header from '@/components/composites/header/header';
import DetailsLayout from '@/components/layouts/detailsLayout/detailsLayout';
import StatisticsView from '@/components/layouts/statisticsView/statisticsView';
import CluesLayout from '@/components/layouts/cluesLayout/cluesLayout';
import WordListLayout from './components/layouts/wordListLayout/wordListLayout';
import SidebarMenu from './components/containers/sidebarMenu/sidebarMenu';
import { useOpenMenu } from './hooks/useOpenMenu';
import { useMenuItems } from './hooks/useMenuItems';
import MenuItem from './components/ui/menuItem/menuItem';
import HelpModal from './components/layouts/helpModal/helpModal';
import SettingsModal from './components/layouts/settingsModal/settingsModal';
import { TabDefinition } from './components/composites/tabBar/tabBar';
import NewPuzzleModal from './components/layouts/newPuzzleModal/newPuzzleModal';
import HiddenFileInput from './components/ui/hiddenFileInput/hiddenFileInput';
import { useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Crossword from './types/crossword';

function App() {
  const { isOpenMenu, toggleOpenMenu, closeOpenMenu } = useOpenMenu(false);
  const { menuItems, openSettings, setOpenSettings, openNewPuzzle, setOpenNewPuzzle,
          openHelp, setOpenHelp, setOpenLoadPuzzle, openLoadPuzzle } = useMenuItems(  );

  const [ getStoredCrossword, _ ] = useLocalStorage<Crossword|null>('crossword', null);

  const tabDefinitions: TabDefinition[] = [
    {
      label: "Details", tabId: "tabDetails", panelId: "tabPanelDetails",
    },
    {
      label: "Statistics", panelId: "tabPanelStats", tabId: "tabStats",
    },
    {
      label: "Clues", panelId: "tabPanelClues", tabId: "tabClues",
    },
    {
      label: "Word List", panelId: "tabPanelWordList", tabId: "tabWordList",
    },
  ];

  useEffect(() => {
    if(getStoredCrossword() === null)
      setOpenNewPuzzle(true);
  }, []);

  const defaultInit = {
    width: 15,
    height: 15,
  };

  return (
    <CrosswordContextProvider initArgs={defaultInit}>
      <WordListContextProvider>
        <Header onClickHandler={toggleOpenMenu} openMainMenu={isOpenMenu} />
        <SidebarMenu openSidebar={isOpenMenu} onLeaveHandler={closeOpenMenu}>
          {menuItems.map((e, i) =>
            <MenuItem key={`mainMenuItem-${i}`} {...e} />)}
        </SidebarMenu>
        <PageLayout openSidebar={isOpenMenu} >
          <SquareGrid />
          <TabLayout tabDefinitions={tabDefinitions}>
            <DetailsLayout hidden={false} labeledBy='tabDetails'
              id='tabPanelDetails' />
            <StatisticsView hidden={false} labeledBy='tabStats'
              id='tabPanelStats' />
            <CluesLayout hidden={false} labeledBy='tabClues'
              id='tabPanelClues' />
            <WordListLayout hidden={false} labeledBy='tabWordList'
              id='tabPanelWordList' />
          </TabLayout>
        </PageLayout>
      </WordListContextProvider>

      <HelpModal isOpen={openHelp}
        closeModalHandler={() => setOpenHelp(false)} />
      <SettingsModal isOpen={openSettings}
        closeModalHandler={() => setOpenSettings(false)} />
      <NewPuzzleModal isOpen={openNewPuzzle}
        closeModalHandler={() => setOpenNewPuzzle(false)} />
      <HiddenFileInput openLoadPuzzle={openLoadPuzzle}
        setOpenLoadPuzzle={setOpenLoadPuzzle} />
    </CrosswordContextProvider>

  );
}

export default App;
