import { Meta, StoryObj } from '@storybook/react';
import TabLayout, { TabLayoutProps } from './tabLayout';
import TabPanel from '@/components/containers/tabPanel/tabPanel';

const meta: Meta<TabLayoutProps> = {
  title: "Layouts/TabLayout",
  component: TabLayout,
  render: (args) => (
    <div>
      <TabLayout {...args}>
        <TabPanel hidden={false} labeledBy='firstTab'
                  id='firstTabPanel'><div>First Tab Content!</div></TabPanel>
        <TabPanel hidden={false} labeledBy='secondTab'
                  id='secondTabPanel'><div>Second Tab Content!</div></TabPanel>
        <TabPanel hidden={false} labeledBy='thirdTab'
                  id='thirdTabPanel'><div>Third Tab Content!</div></TabPanel>
      </TabLayout>
    </div>
  ),
};

export default meta;

type TabLayoutStory = StoryObj<TabLayoutProps>

export const ExampleTabLayout: TabLayoutStory = {
  args: {
    tabDefinitions: [
      {label:"First Tab", panelId: "firstTabPanel", tabId: "firstTab"},
      {label:"Second Tab", panelId: "secondTabPanel", tabId: "secondTab"},
      {label:"Third Tab", panelId: "thirdTabPanel", tabId: "thirdTab"},
    ]
  }
};
