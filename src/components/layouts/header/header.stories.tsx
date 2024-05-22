import { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from './header';
import AppContextProvider from '@/context/applicationContext';

const meta: Meta<HeaderProps> = {
  title: "Layouts/Header",
  component: Header,
  render: (args) => (
    <AppContextProvider>
      <Header {...args} />
    </AppContextProvider>
  ),
};

export default meta;

type HeaderStory = StoryObj<HeaderProps>

export const CrissCrossHeader: HeaderStory = {
};
