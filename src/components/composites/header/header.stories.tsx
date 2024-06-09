import { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from '@/components/composites/header/header';

const meta: Meta<HeaderProps> = {
  title: "Composite Elements/Header",
  component: Header,
  render: (args) => (
    <Header {...args} />
  ),
};

export default meta;

type HeaderStory = StoryObj<HeaderProps>

export const CrissCrossHeader: HeaderStory = {
  args: {
    openMainMenu: false,
  },
};
