import { Meta, StoryObj } from '@storybook/react';
import TextArea, {TextAreaProps} from './textArea';

const meta: Meta<TextAreaProps> = {
  title: "UI Elements/TextArea",
  component: TextArea,
  render: (args) => (
    <TextArea {...args} />
  ),
};

export default meta;

type TextAreaStory = StoryObj<TextAreaProps>

export const BlankTextArea: TextAreaStory = {
  args: {
    label: "Blank Text Area:",
  }
};
