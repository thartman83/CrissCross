import './tablayout.css';
import { ReactNode, useState } from 'react';
import TabBar from '@/components/composites/tabBar/tabBar';

export type TabLayoutProps = {
  tabLabels: string[],
  tabViews: ReactNode[],
};

const TabLayout = ({tabLabels, tabViews}: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0]);

  const onTabClickHandler = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-layout">
      <TabBar tabTitles={tabLabels} activeTab={activeTab}
              onTabClick={onTabClickHandler}/>
      <div className="tab-content">
        {tabViews[tabLabels.indexOf(activeTab)]}
      </div>
    </div>
  );
};

export default TabLayout;
