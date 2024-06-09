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

export const TabBarMouseTests: TabBarStory = {
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
    const tabBar = canvas.getByRole('tablist');
    const tabs = canvas.getAllByRole('tab');

    expect(tabBar).toBeDefined();

    await userEvent.click(tabs[0]);
    expect(onTabClickHandlerMock).toHaveBeenCalledTimes(1);

    await userEvent.click(tabs[1]);
    expect(onTabClickHandlerMock).toHaveBeenCalledTimes(2);

    await userEvent.click(tabs[2]);
    expect(onTabClickHandlerMock).toHaveBeenCalledTimes(3);
  },
};

export const TabBarKeyboardTests: TabBarStory = {
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
    const tabBar = canvas.getByRole('tablist');
    const tabs = canvas.getAllByRole('tab');

    expect(tabBar).toBeDefined();

    // Expected accessibility keyboard behavior for tabs is as follows
    // Right Arrow - focus should move to the next tab, if the last in
    //               the list should focus the first tab. The newly
    //               focused tab should have a tabindex of 0 and the
    //               other tabs should have a tabindex of -1
    // Left Arrow - focus should move to the previous tab or the last tab
    //              if currently focused on the first tab
    //

    tabs[0].focus();
    await userEvent.keyboard('[ArrowRight]');
    expect(tabs[1]).toHaveFocus();
    await userEvent.keyboard('[ArrowRight]');
    expect(tabs[2]).toHaveFocus();
    await userEvent.keyboard('[ArrowRight]');
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('[ArrowLeft]');
    expect(tabs[2]).toHaveFocus();
    await userEvent.keyboard('[ArrowLeft]');
    expect(tabs[1]).toHaveFocus();
    await userEvent.keyboard('[ArrowLeft]');
    expect(tabs[0]).toHaveFocus();


    // test keyboard select events
    await userEvent.keyboard('[ArrowRight]');
    // we should now be on tab 1
    await userEvent.keyboard('[Space]');
    expect(onTabClickHandlerMock).toHaveBeenCalledTimes(1);
    expect(tabs[1]).toHaveFocus();

    // make sure that a mouse event doesn't change the focus element when we move
    await userEvent.click(tabs[0]);
    await userEvent.keyboard('[ArrowRight]');
    expect(tabs[2]).toHaveFocus();
  },
};
