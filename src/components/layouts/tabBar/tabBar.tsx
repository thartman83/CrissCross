import { useState } from "react";
import "./tabBar.css";
import Tab from '@/components/ui/tab/tab';

export type TabBarProps = {
  tabTitles: string[],
};

const TabBar = (props: TabBarProps) => {
  const [activeTab, setActiveTab] = useState<string>(props.tabTitles[0]);

  const onClick = (title: string) => {
    setActiveTab(title);
  };

  return (
    <ul className="tab-list">
      {
        props.tabTitles.map( (s) =>
          <Tab key={`tab-${s}`} title={s} active={s === activeTab}
               onClick={onClick} />
        )
      }
    </ul>
  );
};

export default TabBar;
