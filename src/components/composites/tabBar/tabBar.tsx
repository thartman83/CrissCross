import { KeyboardEvent, useState } from "react";
import "./tabBar.css";
import Tab from '@/components/ui/tab/tab';

type OnKeyDownEvent = KeyboardEvent<HTMLElement>

export type TabBarProps = {
  tabTitles: string[],
  activeTab: string,
  tabLabel?: string,
  onTabClick: (tabName: string) => void
};

const TabBar = (props: TabBarProps) => {
  const [focusedTab, setFocusedTab] = useState<number>(0);

  const onKeyDownHandler = (e: OnKeyDownEvent) => {
    switch(e.key) {
    case 'ArrowLeft':
      setFocusedTab(focusedTab > 0 ? focusedTab - 1 : (props.tabTitles.length - 1));
      e.preventDefault();
      break;
    case 'ArrowRight':
      setFocusedTab(focusedTab < (props.tabTitles.length - 1) ?
                    focusedTab + 1 : 0);
      e.preventDefault();
      break;
    }
  };

  return (
    <div className="tab-list" role="tablist" aria-label={props.tabLabel}
         onKeyDown={onKeyDownHandler}>
      {
        props.tabTitles.map( (s, i) =>
          <Tab key={`tab-${s}`} title={s} active={s === props.activeTab}
               focused={focusedTab === i} onClick={props.onTabClick} />
        )
      }
    </div>
  );
};

export default TabBar;
