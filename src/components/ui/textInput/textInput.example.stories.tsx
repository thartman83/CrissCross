import { Meta, StoryObj } from '@storybook/react';
import TextInput, {TextInputProps} from './textInput';

const meta: Meta<TextInputProps> = {
  title: "UI Elements/Text Input/Examples",
  component: TextInput,
  render: (args) => (
    <TextInput {...args} />
  ),
};

export default meta;

type TextInputStory = StoryObj<TextInputProps>

export const BlankTextInput: TextInputStory = {
  args: {
    label: "Example Textbox",
    changeHandler: () => {},
  },
};

export const BlankTextInputPlaceholder: TextInputStory = {
  args: {
    label: "Example Textbox with placeholder",
    changeHandler: () => {},
    placeholder: "Example placeholder",
  }
};

export const UnicodeRightIcon: TextInputStory = {
  args: {
    label: "Unicode right icon",
    changeHandler: () => {},
    rightIcon: String.fromCodePoint(0x26B2),
    rightIconRotate: -45,
  },
};
