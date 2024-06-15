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
import { useMenuItems } from './hooks/useMenuItems';
import { useOpenMenu } from './hooks/useOpenMenu';

function App() {
  const { isOpenMenu, toggleOpenMenu, closeOpenMenu } = useOpenMenu();
  const { menuItems } = useMenuItems();

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
            <SidebarMenu menuItems={menuItems} openSidebar={isOpenMenu}
                         onLeaveHandler={closeOpenMenu}/>
            <PageLayout openSidebar={isOpenMenu} >
              <SquareGrid />
              <TabLayout tabViews={tabViews} tabLabels={tabLabels} />
            </PageLayout>
          </WordListContextProvider>
        </CrosswordContextProvider>
      </AppContextProvider>
  );
}

export default App;
