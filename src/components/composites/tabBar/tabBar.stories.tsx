import { Meta, StoryObj } from '@storybook/react';
import TabBar, {TabBarProps} from '@/components/composites/tabBar/tabBar';

const meta: Meta<TabBarProps> = {
  title: "Composite Elements/Tab Bar",
  component: TabBar,
  render: (args) => (
    <TabBar {...args} />
  ),
};

export default meta;

type TabBarStory = StoryObj<TabBarProps>

export const ExampleTabBar: TabBarStory = {
  args: {
    tabDefinitions: [
      {label:"First Tab", panelId: "firstTabPanel", tabId: "firstTab"},
      {label:"Second Tab", panelId: "secondTabPanel", tabId: "secondTab"},
      {label:"Third Tab", panelId: "thirdTabPanel", tabId: "thirdTab"},
    ],

    activeTab: "firstTab",
    onTabClick: () => {}
  },
};
