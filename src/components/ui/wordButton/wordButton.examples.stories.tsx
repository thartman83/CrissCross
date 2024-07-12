import { Meta, StoryObj } from '@storybook/react';
import WordButton, {WordButtonProps} from './wordButton';

const meta: Meta<WordButtonProps> = {
  title: "UI Elements/Word Button/Examples",
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

export const WordButtonExample: WordButtonStory = {
  args: {
    word: { word: "EXAMPLEWORD", value: 90 },
    selectHandler: () => {},
  },
};
