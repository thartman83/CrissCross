import { Meta, StoryObj } from '@storybook/react';
import ToggleSetting, {ToggleSettingProps} from './toggleSetting';
import { fn } from '@storybook/test';

const mockToggleHandler = fn();

const meta: Meta<ToggleSettingProps> = {
  title: "Composite Elements/Toggle Setting/Examples",
  component: ToggleSetting,
  render: (args) => {
    return (
      <div style={{backgroundColor: "var(--color-primary)",
                   padding: "5rem",
                   display: "flex",
                   alignItems: "center",
                   borderRadius: "5px",
                  }}>
      <ToggleSetting {...args} />
      </div>
    );
  },
};

export default meta;

type ToggleSettingStory = StoryObj<ToggleSettingProps>

export const DarkModeSettingExample: ToggleSettingStory = {
  args: {
    label: "Dark mode",
    defaultState: false,
    toggleHandler: mockToggleHandler,
  }
};
