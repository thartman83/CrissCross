import { Meta, StoryObj } from '@storybook/react';
import HelpKey, {HelpKeyProps} from '@/components/ui/helpKey/helpKey';

const meta: Meta<HelpKeyProps> = {
  title: "UI Elements/Help Key",
  component: HelpKey,
  render: (args) => (
    <HelpKey {...args} />
  ),
};

export default meta;

type HelpKeyStory = StoryObj<HelpKeyProps>

export const ExampleHelpKey: HelpKeyStory = {
  args: {
    label: "!",
  },
};
