import { ReactNode, useState } from 'react';
import './tablayout.css';
import TabLink from '../ui/tabLink';
import StatisticsView from './statisticsView';
import CluesView from './cluesView';
import WordListView from './wordListView';
import DetailsView from './detailsView';

const TabLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("Details");

  const tabs: { [key: string]: ReactNode } = {
    "Details": <DetailsView />,
    "Statistics": <StatisticsView/>,
    "Clues": <CluesView/>,
    "Word List": <WordListView/>
  };

  const tabLinks = Object.keys(tabs).map((t: string, _) =>
    <TabLink key={`tab-link-${t}`} title={t} active={activeTab === t} setActiveTab={setActiveTab}/>
  );

  return (
    <div className="tab-layout">
      <ul className="tab-list">
        { tabLinks }
      </ul>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
    </div>
  );
};

export default TabLayout;
