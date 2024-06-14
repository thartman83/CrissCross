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
import { MenuItemProps } from './components/ui/menuItem/menuItem';
import SidebarMenu from './components/containers/sidebarMenu/sidebarMenu';
import { useState } from 'react';

function App() {
  const [ openSidebar, setOpenSidebar ] = useState(false);

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

  const menuItems: MenuItemProps[] = [
    {
      text: "New Puzzle",
      onClickHandler: () => {},
      faIcon: "Plus",
    },
    {
      text: "Settings",
      onClickHandler: () => {},
      faIcon: "Gear",
    },
    {
      text: "Help",
      onClickHandler: () => {},
      faIcon: "Question",
    },
  ];

  const onHeaderClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const onLeaveHandler = () => {
    console.log('here');
    setOpenSidebar(false);
  };

  return (
      <AppContextProvider>
        <CrosswordContextProvider>
          <WordListContextProvider>
            <Header onClickHandler={onHeaderClick} openMainMenu={openSidebar} />
            <SidebarMenu menuItems={menuItems} openSidebar={openSidebar}
                         onLeaveHandler={onLeaveHandler}/>
            <PageLayout openSidebar={openSidebar} >
              <SquareGrid />
              <TabLayout tabViews={tabViews} tabLabels={tabLabels} />
            </PageLayout>
          </WordListContextProvider>
        </CrosswordContextProvider>
      </AppContextProvider>
  );
}

export default App;
