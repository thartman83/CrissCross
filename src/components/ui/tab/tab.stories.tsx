import { Meta, StoryObj } from '@storybook/react';
import Tab, {TabProps} from '@/components/ui/tab/tab';

const meta: Meta<TabProps> = {
  title: "UI Elements/Tab",
  component: Tab,
  render: (args) => (
    <ul className='tab-list'>
      <Tab {...args} />
    </ul>
  ),
};

export default meta;

type TabStory = StoryObj<TabProps>

export const BasicTab: TabStory = {
  args: {
    title: "An Inactive Tab",
    active: false,
  },
};

export const ActiveTab: TabStory = {
  args: {
    title: "An Active Tab",
    active: true,
  },
};
