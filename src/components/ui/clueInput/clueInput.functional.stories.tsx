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
    <div role="listitem">
      <ClueInput {...args} />
    </div>
  ),
};

export default meta;

type ClueInputStory = StoryObj<ClueInputProps>

export const EventTesting: ClueInputStory = {
  args: {
    changeHandler: mockChangeHandler,
    clue: "",
    clueNo: 10,
    highlight: true,
    focusHandler: mockFocusHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const txtlbl = canvas.getByText(10);
    const li = canvas.getByRole('listitem');
    const textarea = canvas.getByRole('textbox');

    await step('When the text area is tabbed into, is should fire focus event', async () => {
      await userEvent.click(li.parentElement || li);
      await userEvent.tab();
      expect(mockFocusHandler).toBeCalledTimes(1);
    });

    await step('When the label is clicked, should fire focus event', async () => {
      await userEvent.click(li.parentElement || li);
      mockFocusHandler.mockReset();
      await userEvent.click(txtlbl);
      expect(mockFocusHandler).toBeCalledTimes(1);
    });

    await step('When the text area is click, is should fire focus event', async () => {
      await userEvent.click(li.parentElement || li);
      mockFocusHandler.mockReset();
      await userEvent.click(textarea);
      expect(mockFocusHandler).toBeCalledTimes(1);
    });

    await step('Should fire an event for every input change', async () => {
      await userEvent.tab();
      await userEvent.click(textarea);
      await userEvent.keyboard('This is a clue');
      expect(mockChangeHandler).toHaveBeenCalled();
      expect(mockChangeHandler).toHaveBeenCalledTimes(14);
    });
  },
};
