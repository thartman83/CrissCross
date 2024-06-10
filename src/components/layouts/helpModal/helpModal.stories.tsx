import { Meta, StoryObj } from '@storybook/react';
import HelpModal, {HelpModalProps} from '@/components/layouts/helpModal/helpModal';

const meta: Meta<HelpModalProps> = {
  title: "Layouts/Help Modal",
  component: HelpModal,
  render: (args) => (
    <HelpModal {...args} />
  ),
};

export default meta;

type HelpModalStory = StoryObj<HelpModalProps>

export const HelpModalExample: HelpModalStory = {
  args: {
    isOpen: true,
  },
};
