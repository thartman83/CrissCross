import { Meta, StoryObj } from '@storybook/react';
import TextInput, {TextInputProps} from './textInput';

const meta: Meta<TextInputProps> = {
  title: "UI Elements/Text Input",
  component: TextInput,
  render: (args) => (
    <TextInput {...args} />
  ),
};

export default meta;

type TextInputStory = StoryObj<TextInputProps>

export const BlankTextInput: TextInputStory = {
  args: {
    label: "Blank Text Input:",
    defaultValue: "",
    onChangeHandler: () => {},
  }
};
