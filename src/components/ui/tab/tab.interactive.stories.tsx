import { Meta, StoryObj } from '@storybook/react';
import Tab, {TabProps} from './tab';
import { expect } from '@storybook/jest';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';

const onClickHandlerMock = fn();

const meta: Meta<TabProps> = {
  title: "ui elements/tab/Interactions",
  component: Tab,
  render: (args) => (
    <Tab {...args} />
  ),
};

export default meta;

type TabStory = StoryObj<TabProps>

export const TabMouseTest: TabStory = {
  args: {
    active: false,
    focused: false,
    onClick: onClickHandlerMock,
    controlId: "A Tab Panel",
    title: "A Tab",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabBtn = canvas.getByRole('tab');

    expect(tabBtn).toBeDefined();
    await userEvent.click(tabBtn);
    expect(onClickHandlerMock).toHaveBeenCalled();
    expect(onClickHandlerMock).toHaveBeenCalledTimes(1);
  },
};

export const TabKeyboardTest: TabStory = {
  args: {
    active: false,
    focused: true,
    onClick: onClickHandlerMock,
    controlId: "A Tab Panel",
    title: "A Tab",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabBtn = canvas.getByRole('tab');

    // Verify that space and enter engages the onclick event
    tabBtn.focus();
    expect(tabBtn).toHaveFocus();

    await userEvent.keyboard('[Space]');
    expect(onClickHandlerMock).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('[Enter]');
    expect(onClickHandlerMock).toHaveBeenCalledTimes(2);
  },
};

export const UnfocusedTabAccessibilityTests: TabStory = {
  args: {
    active: false,
    focused: false,
    onClick: onClickHandlerMock,
    controlId: "A Tab Panel",
    title: "A Tab",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabBtn = canvas.getByRole('tab');
    // inactive accessibility controls
    // an unfocused tab should have the following accessibility properties
    // - tabindex === -1
    // - aria-selected === false
    expect(tabBtn).toHaveAttribute('tabindex', '-1');
    expect(tabBtn).toHaveAttribute('aria-selected', 'false');
  },
};

export const FocusedTabAccessibilityTests: TabStory = {
  args: {
    active: true,
    focused: true,
    onClick: onClickHandlerMock,
    controlId: "A Tab Panel",
    title: "A Tab",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabBtn = canvas.getByRole('tab');

    // active accessibility controls
    // a focused tab should have the following accessibility properties
    // - tabindex == 0
    // - aria-selected == true
    expect(tabBtn).toHaveAttribute('aria-selected', 'true');
    expect(tabBtn).toHaveAttribute('tabindex', '0');
  },
};
