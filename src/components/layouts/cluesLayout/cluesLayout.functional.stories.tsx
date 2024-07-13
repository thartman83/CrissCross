import { Meta, StoryObj } from '@storybook/react';
import CluesLayout from './cluesLayout';
import { TabPanelProps } from '@/components/containers/tabPanel/tabPanel';
import CrosswordContextProvider from '@/context/crosswordContext';

const meta: Meta<TabPanelProps> = {
  title: "Layouts/CluesLayout/Functional Tests",
  component: CluesLayout,
  render: (args) => (
    <CrosswordContextProvider initArgs={{
      width: 15,
      height: 15,
      autoSave: false,
    }}>
      <CluesLayout {...args} />
    </CrosswordContextProvider>
  ),
};

export default meta;

type CluesLayoutStory = StoryObj<TabPanelProps>

export const CluesLayoutExample: CluesLayoutStory = {
  args: {

  }
};
