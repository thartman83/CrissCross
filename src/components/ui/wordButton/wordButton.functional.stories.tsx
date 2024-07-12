import { Meta, StoryObj } from '@storybook/react';
import WordButton, {WordButtonProps} from './wordButton';
import { fn, within, expect } from '@storybook/test';
import { userEvent } from '@testing-library/user-event';

const mockSelectHandler = fn();

const meta: Meta<WordButtonProps> = {
  title: "UI Elements/Word Button/Functional Tests",
  component: WordButton,
  render: (args) => (
    <div style={{backgroundColor: "var(--color-quaternary)", height: "20rem",
                 padding: ".5rem"}}>
      <WordButton {...args} />
    </div>
  ),
};

export default meta;

type WordButtonStory = StoryObj<WordButtonProps>

export const SelectHandlerTests: WordButtonStory = {
  args: {
    word: {word: "EXAMPLEWORD", value: 99},
    selectHandler: mockSelectHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button');

    await step('Should fire the select handler event when clicked', async () => {
      await userEvent.click(btn);
      expect(mockSelectHandler).toBeCalledTimes(1);
    });

    mockSelectHandler.mockClear();

    await step('Should fire the select handler when the element has focus and enter is pressed', async () => {
      btn.focus();

      await userEvent.keyboard('[Enter]');
      expect(mockSelectHandler).toBeCalledTimes(1);
    });
  },
};
