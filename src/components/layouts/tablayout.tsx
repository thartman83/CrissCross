import { useState } from 'react';
import './tablayout.css';
import TabLink from '../ui/tabLink';

const TabLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("Summary");

  const tabs = ["Summary", "Statistics", "Clues", "Word List"];

  const tabLinks = tabs.map((t: string, _) =>
    <TabLink key={`tab-link-${t}`} title={t} active={activeTab === t} setActiveTab={setActiveTab}/>
  );

  return (
    <div className="tab-layout">
      <ul className="tab-list">
        { tabLinks }
      </ul>
      <div className="tab-content">

      </div>
    </div>
  );
};

export default TabLayout;
