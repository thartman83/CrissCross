import { ReactNode, useState } from 'react';
import './tablayout.css';
import TabLink from '../ui/tabLink';
import SummaryView from './summaryView';
import StatisticsView from './statisticsView';
import CluesView from './cluesView';
import WordListView from './wordListView';
import { useCrossword } from '../../context/crosswordContext';
import { generateAutoFill } from '../../utils/autoFillUtilities';
import { useWordList } from '../../context/wordListContext';

const TabLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("Summary");
  const {crossword} = useCrossword();
  const {wordList} = useWordList()


  const tabs: { [key: string]: ReactNode } = {
    "Summary": <SummaryView/>,
    "Statistics": <StatisticsView/>,
    "Clues": <CluesView/>,
    "Word List": <WordListView/>
  };

  const tabLinks = Object.keys(tabs).map((t: string, _) =>
    <TabLink key={`tab-link-${t}`} title={t} active={activeTab === t} setActiveTab={setActiveTab}/>
  );

    const onAutoFillClickHandler = () => {
        setTimeout(() => {
            generateAutoFill(crossword, wordList.filter(
                (val: {word: string, value: number}) => val.value > 30));
        },300);

  };

  return (
    <div className="tab-layout">
      <ul className="tab-list">
        { tabLinks }
      </ul>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
      <button onClick={onAutoFillClickHandler}>Auto Fill</button>
    </div>
  );
};

export default TabLayout;
