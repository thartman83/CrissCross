import { Meta, StoryObj } from '@storybook/react';
import TabBar, {TabBarProps} from './tabBar';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { fn } from '@storybook/test';
import { userEvent } from '@testing-library/user-event';

const onTabClickHandlerMock = fn();

const meta: Meta<TabBarProps> = {
  title: "composite elements/Tabbar/Interactions",
  component: TabBar,
  render: (args) => (
    <TabBar {...args} />
  ),
};

export default meta;

type TabBarStory = StoryObj<TabBarProps>

export const TabBarClickTabs: TabBarStory = {
  args: {
    tabTitles: [
      "First Tab",
      "Second Tab",
      "Third Tab"
    ],
    activeTab: "First Tab",
    onTabClick: onTabClickHandlerMock,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    await userEvent.click(tabs[0]);
    expect(tabs[0]).toHaveClass('active');
  },
};
