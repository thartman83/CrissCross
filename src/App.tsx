import './App.css';
import SquareGrid from '@/components/layouts/squareGrid/squareGrid';
import CrosswordContextProvider from '@/context/crosswordContext';
import AppContextProvider from '@/context/applicationContext';
import TabLayout from '@/components/layouts/tabLayout/tablayout';
import WordListContextProvider from '@/context/wordListContext';
import PageLayout from '@/components/layouts/pageLayout';
import Header from '@/components/composites/header/header';
import DetailsView from '@/components/layouts/detailsView';
import StatisticsView from '@/components/layouts/statisticsView';
import CluesView from '@/components/layouts/cluesView';
import WordListView from './components/layouts/wordListView';
import SidebarMenu from './components/containers/sidebarMenu/sidebarMenu';
import { useOpenMenu } from './hooks/useOpenMenu';
import { useMenuItems } from './hooks/useMenuItems';
import MenuItem from './components/ui/menuItem/menuItem';
import HelpModal from './components/layouts/helpModal/helpModal';
import SettingsModal from './components/layouts/settingsModal/settingsModal';

function App() {
  const { isOpenMenu, toggleOpenMenu, closeOpenMenu } = useOpenMenu(false);
  const { menuItems, openSettings, setOpenSettings,
          openHelp, setOpenHelp, } = useMenuItems();

  const tabViews = [
    <DetailsView/>,
    <StatisticsView/>,
    <CluesView/>,
    <WordListView/>
  ];

  const tabLabels = [
    "Details",
    "Statistics",
    "Clues",
    "Word List"
  ];

  return (
      <AppContextProvider>
        <CrosswordContextProvider>
          <WordListContextProvider>
            <Header onClickHandler={toggleOpenMenu} openMainMenu={isOpenMenu} />
            <SidebarMenu openSidebar={isOpenMenu} onLeaveHandler={closeOpenMenu}>
              {menuItems.map((e, i) =>
                <MenuItem key={`mainMenuItem-${i}`} {...e} />)}
              </SidebarMenu>
            <PageLayout openSidebar={isOpenMenu} >
              <SquareGrid />
              <TabLayout tabViews={tabViews} tabLabels={tabLabels} />
            </PageLayout>
          </WordListContextProvider>

          <HelpModal isOpen={openHelp}
                     closeModalHandler={ () => setOpenHelp(false) } />
          <SettingsModal isOpen={openSettings}
                         closeModalHandler={ () => setOpenSettings(false) }/>
        </CrosswordContextProvider>
      </AppContextProvider>
  );
}

export default App;
