import { Meta, StoryObj } from '@storybook/react';
import ToggleButton, {ToggleButtonProps} from './toggleButton';
import { expect, fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

const mockOnToggleHandler = fn();

const meta: Meta<ToggleButtonProps> = {
  title: "UI Elements/Toggle Button/Functional Tests",
  component: ToggleButton,
  render: (args) => (
    <ToggleButton {...args} />
  ),
};

export default meta;

type ToggleButtonStory = StoryObj<ToggleButtonProps>

export const ClickToggleButton: ToggleButtonStory = {
  args: {
    name: "main-menu",
    faIcon: "Bars",
    state: false,
    label: "Toggle Main Menu",
    onToggleHandler: mockOnToggleHandler
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toggleBtn = canvas.getByRole('checkbox');

    await step('When the header has focus it should fire the toggle event on spacebar', async () => {
      toggleBtn.focus();

      await userEvent.keyboard('[Space]');
      expect(mockOnToggleHandler).toHaveBeenCalledTimes(1);
    });
  },
};
