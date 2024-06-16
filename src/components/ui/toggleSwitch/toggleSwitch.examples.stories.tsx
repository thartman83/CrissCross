import { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch, {ToggleSwitchProps} from './toggleSwitch';

const meta: Meta<ToggleSwitchProps> = {
  title: "UI Elements/Toggle Switch/Examples",
  component: ToggleSwitch,
  render: (args) => (
    <div style={{backgroundColor: "var(--color-primary)",
                 padding: "5rem",
                 display: "flex",
                 alignItems: "center",
                 borderRadius: "5px",
                }}>
      <ToggleSwitch {...args} />
    </div>
  ),
};

export default meta;

type ToggleSwitchStory = StoryObj<ToggleSwitchProps>

export const ToggleSwitchOnExample: ToggleSwitchStory = {
  args: {
    defaultState: true,
  }
};

export const ToggleSwitchOffExample: ToggleSwitchStory = {
  args: {
    defaultState: false,
  }
};
