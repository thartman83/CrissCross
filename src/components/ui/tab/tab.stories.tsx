import { Meta, StoryObj } from '@storybook/react';
import Tab, {TabProps} from '@/components/ui/tab/tab';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';

const onClickHandler = fn();

const meta: Meta<TabProps> = {
  title: "UI Elements/Tab",
  component: Tab,
  render: (args) => (
    <Tab {...args} />
  ),
  args: {
    onClick: onClickHandler,
  }
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

export const FocusedTab: TabStory = {
  args: {
    title: "A Focused Tab",
    active: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabBtn = canvas.getByRole('tab');

    tabBtn.focus();
  },
};
