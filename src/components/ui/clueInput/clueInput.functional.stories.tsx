import { Meta, StoryObj } from '@storybook/react';
import ClueInput, {ClueInputProps} from './clueInput';
import { expect, fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';

const mockChangeHandler = fn();
const mockFocusHandler = fn();

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

export const FireFocusEvent: ClueInputStory = {
  args: {
    changeHandler: mockChangeHandler,
    clue: "",
    clueNo: 10,
    highlight: false,
    focusHandler: mockFocusHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const txtlbl = canvas.getByText(10);
    const txtArea = canvas.getByRole('textbox');

    await step('When the label is clicked, should fire focus event', async () => {
      await userEvent.click(txtlbl);
      expect(mockFocusHandler).toBeCalledTimes(1);
    });

    await step('When the text area is click, is should fire focus event', async () => {
      mockFocusHandler.mockReset();
      await userEvent.click(txtArea);
      expect(mockFocusHandler).toBeCalledTimes(1);
    });

    await step('When the text area is tabbed into, is should fire focus event', async () => {
      //shift tab out of the text area focus
      await userEvent.tab({shift: true});
      mockChangeHandler.mockReset();
      await userEvent.tab();
      expect(mockFocusHandler).toBeCalledTimes(1);
    });
  },
};
