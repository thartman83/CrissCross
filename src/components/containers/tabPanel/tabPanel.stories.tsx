import { Meta, StoryObj } from '@storybook/react';
import TabPanel, {TabPanelProps} from './tabPanel';

const meta: Meta<TabPanelProps> = {
  title: "Containers/Tab Panel",
  component: TabPanel,
  render: (args) => (
    <div style={{display: "flex", height: "80vh"}}>
      <TabPanel {...args} />
    </div>
  ),
};

export default meta;

type TabPanelStory = StoryObj<TabPanelProps>

export const TextTabPanel: TabPanelStory = {
  args: {
    children: <div>This is a tab panel</div>
  },
};
