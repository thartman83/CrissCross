import "./tabBar.css";
import Tab from '@/components/ui/tab/tab';

export type TabBarProps = {
  tabTitles: string[],
  activeTab: string,
  onTabClick: (tabName: string) => void
};

const TabBar = (props: TabBarProps) => {
  return (
    <ul className="tab-list">
      {
        props.tabTitles.map( (s) =>
          <Tab key={`tab-${s}`} title={s} active={s === props.activeTab}
               onClick={props.onTabClick} />
        )
      }
    </ul>
  );
};

export default TabBar;
