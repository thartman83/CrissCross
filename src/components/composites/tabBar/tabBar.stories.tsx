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
    tabTitles: [
      "First Tab",
      "Second Tab",
      "Third Tab",
    ],
    activeTab: "First Tab",
    onTabClick: () => {}
  },
};
