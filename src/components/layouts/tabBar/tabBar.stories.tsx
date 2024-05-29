import { Meta, StoryObj } from '@storybook/react';
import TabBar, {TabBarProps} from '@/components/layouts/tabBar/tabBar';

const meta: Meta<TabBarProps> = {
  title: "Layouts/TabBar",
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
    ]
  },
};
