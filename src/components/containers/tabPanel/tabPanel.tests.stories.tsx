import { Meta, StoryObj } from '@storybook/react';
import TabPanel, {TabPanelProps} from './tabPanel';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TabPanelProps> = {
  title: "Containers/Tab Panel/Tests",
  component: TabPanel,
  render: (args) => (
    <div style={{display: "flex", height: "80vh"}}>
      <TabPanel {...args} />
    </div>
  ),
};

export default meta;

type tabPanelStory = StoryObj<TabPanelProps>

export const tabPanelAccessibilityTests: tabPanelStory = {
  args: {
    children: <div>This is a tab panel.</div>,
    labeledBy: "aTab",
    hidden: false,
    id: "aTabPanel",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabPanel = canvas.getByRole('tabpanel');

    expect(tabPanel).toBeDefined();
    expect(tabPanel).toHaveProperty('hidden', false);
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'aTab');
    expect(tabPanel).toHaveAttribute('id', 'aTabPanel');
    expect(tabPanel).toHaveAttribute('tabIndex', "0");
  },
};

export const hiddenTabPanelAccessibilityTests: tabPanelStory = {
  args: {
    children: <div>This is a tab panel.</div>,
    labeledBy: "aTab",
    hidden: true,
    id: "aTabPanel",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabPanel = canvas.getByRole('tabpanel', {hidden: true});

    expect(tabPanel).toBeDefined();
    expect(tabPanel).toHaveProperty('hidden', true);
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'aTab');
    expect(tabPanel).toHaveAttribute('id', 'aTabPanel');
    expect(tabPanel).toHaveAttribute('tabIndex', "0");
  },
};
