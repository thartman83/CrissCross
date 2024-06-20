import './tabLayout.css';
import { ReactNode, useState } from 'react';
import TabBar, { TabDefinition } from '@/components/composites/tabBar/tabBar';

export type TabLayoutProps = {
  tabDefinitions: TabDefinition[],
  children: ReactNode[],
};

const TabLayout = ({tabDefinitions, children}: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabDefinitions[0].panelId);

  const onTabClickHandler = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-layout">
      <TabBar tabDefinitions={tabDefinitions}
              activeTab={activeTab}
              onTabClick={onTabClickHandler}/>
      {children[tabDefinitions.findIndex( tab => tab.panelId === activeTab)]}
    </div>
  );
};

export default TabLayout;
