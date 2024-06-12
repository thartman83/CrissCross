import { Meta, StoryObj } from '@storybook/react';
import TabLayout, { TabLayoutProps } from './tablayout';

const meta: Meta<TabLayoutProps> = {
  title: "Layouts/TabLayout",
  component: TabLayout,
  render: (args) => (
    <div className=''>
      <TabLayout {...args} />
    </div>
  ),
};

export default meta;

type TabLayoutStory = StoryObj<TabLayoutProps>

export const ExampleTabLayout: TabLayoutStory = {
  args: {
    tabLabels: [
      "First Tab",
      "Second Tab",
      "Third Tab",
    ],
    tabViews: [
      <>First Tab Content!</>,
      <>Second Tab Content!</>,
      <>Third Tab Content!</>,
    ]
  }
};
