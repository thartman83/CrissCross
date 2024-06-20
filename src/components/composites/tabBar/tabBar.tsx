import { KeyboardEvent, useState } from "react";
import "./tabBar.css";
import Tab from '@/components/ui/tab/tab';

type OnKeyDownEvent = KeyboardEvent<HTMLElement>

export type TabDefinition = {
  label: string,
  panelId: string,
  tabId: string,
};

export type TabBarProps = {
  tabDefinitions: TabDefinition[],
  activeTab: string,
  tabLabel?: string,
  onTabClick: (tabName: string) => void
};

const TabBar = (props: TabBarProps) => {
  const [focusedTab, setFocusedTab] = useState<number>(0);

  const onKeyDownHandler = (e: OnKeyDownEvent) => {
    switch(e.key) {
    case 'ArrowLeft':
      setFocusedTab(focusedTab > 0 ? focusedTab - 1 :
                    (props.tabDefinitions.length - 1));
      e.preventDefault();
      break;
    case 'ArrowRight':
      setFocusedTab(focusedTab < (props.tabDefinitions.length - 1) ?
                    focusedTab + 1 : 0);
      e.preventDefault();
      break;
    }
  };

  return (
    <div className="tab-list" role="tablist" aria-label={props.tabLabel}
         onKeyDown={onKeyDownHandler}>
      {
        props.tabDefinitions.map( (tab, i) =>
          <Tab key={`tab-${i}`} title={tab.label}
               active={tab.panelId === props.activeTab}
               controlId={tab.panelId}
               focused={focusedTab === i} onClick={props.onTabClick} />
        )
      }
    </div>
  );
};

export default TabBar;
