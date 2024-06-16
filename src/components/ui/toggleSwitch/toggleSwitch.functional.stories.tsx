import { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch, {ToggleSwitchProps} from './toggleSwitch';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { fn } from '@storybook/test';

const mockToggleHandler = fn();

const meta: Meta<ToggleSwitchProps> = {
  title: "UI Elements/Toggle Switch/Functional Tests",
  component: ToggleSwitch,
  render: (args) => (
    <div style={{backgroundColor: "var(--color-primary)",
                 padding: "5rem",
                 display: "flex",
                 alignItems: "center",
                 borderRadius: "5px",
                }}>
      <ToggleSwitch {...args} />
    </div>
  ),
};

export default meta;

type ToggleSwitchStory = StoryObj<ToggleSwitchProps>

export const ClickToggleTests: ToggleSwitchStory = {
  args: {
    defaultState: false,
    toggleHandler: mockToggleHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Clicking on a uncheck toggle should change state to checked', async () => {
      expect(input).not.toBeChecked();
      await userEvent.click(input);

      expect(input).toBeChecked();
    });
    await step('Clicking on a check toggle should change state to unchecked', async () => {
      expect(input).toBeChecked();
      await userEvent.click(input);
      expect(input).not.toBeChecked();
    });
  },
};

export const KeyboardToggleTests: ToggleSwitchStory = {
  args: {
    defaultState: false,
    toggleHandler: mockToggleHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await userEvent.tab();

    await step('Spacebar should mark an unchecked toggle as checked', async () => {
      expect(input).not.toBeChecked();
      await userEvent.keyboard('[Space]');
      expect(input).toBeChecked();
    });

    await step('Spacebar should mark a checked toggle as unchecked', async () => {
      expect(input).toBeChecked();
      await userEvent.keyboard('[Space]');
      expect(input).not.toBeChecked();
    });
  },
};

export const ToggleEventTests: ToggleSwitchStory = {
  args: {
    defaultState: false,
    toggleHandler: mockToggleHandler
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Clicking on the toggle switch should fire a toggle event', async () => {
      await userEvent.click(input);
      expect(mockToggleHandler).toHaveBeenCalledTimes(1);
      expect(mockToggleHandler).toHaveBeenCalledWith(true);

      await userEvent.click(input);
      expect(mockToggleHandler).toHaveBeenCalledTimes(2);
      expect(mockToggleHandler).toHaveBeenCalledWith(false);
    });

  },
};
