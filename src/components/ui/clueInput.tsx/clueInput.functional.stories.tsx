import { Meta, StoryObj } from '@storybook/react';
import ClueInput, {ClueInputProps} from './clueInput';
import { expect, fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';

const mockChangeHandler = fn();

const meta: Meta<ClueInputProps> = {
  title: "UI elements/Clue Input/Functional Tests",
  component: ClueInput,
  render: (args) => (
    <ClueInput {...args} />
  ),
};

export default meta;

type ClueInputStory = StoryObj<ClueInputProps>

export const FireOnChangeEvent: ClueInputStory = {
  args: {
    changeHandler: mockChangeHandler,
    clue: "",
    clueNo: 10,
    highlight: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    input.focus();
    await step('Should fire an event for every input change', async () => {
      await userEvent.keyboard('This is a clue');
      expect(mockChangeHandler).toHaveBeenCalled();
      expect(mockChangeHandler).toHaveBeenCalledTimes(14);
    });
  },
};
