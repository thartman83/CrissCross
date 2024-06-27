import { Meta, StoryObj } from '@storybook/react';
import ClueInput, {ClueInputProps} from './clueInput';

const meta: Meta<ClueInputProps> = {
  title: "UI Elements/Clue Input/Examples",
  component: ClueInput,
  render: (args) => (
    <div style={{"width": "75%"}}>
      <ClueInput {...args} />
    </div>
  ),
};

export default meta;

type ClueInputStory = StoryObj<ClueInputProps>

export const BlankClue: ClueInputStory = {
  args: {
    clue: "",
    clueNo: 10,
    changeHandler: () => {},
  }
};

export const FilledClue: ClueInputStory = {
  args: {
    clue: "This is the clue",
    clueNo: 10,
    changeHandler: () => {},
  },
};

export const MultiLineClue: ClueInputStory = {
  args: {
    clue: "This is a very long clue that will overflow the space provided by the div above the component",
    clueNo: 10,
    changeHandler: () => {},
  },
};
