import { Meta, StoryObj } from '@storybook/react';
import ToggleButton, {ToggleButtonProps} from './toggleButton';
import { IconName } from '../faIcons';

const meta: Meta<ToggleButtonProps> = {
  title: "UI Elements/Toggle Button/Examples",
  component: ToggleButton,
  argTypes: {
    faIcon: {
      options: [...Object.values(IconName)],
      control: {type: "select",},
    },
    faIconAlt: {
      options: ["",...Object.values(IconName)],
      control: {type: "select",},
    },
  },
  render: (args) => (
    <ToggleButton {...args} />
  ),
};

export default meta;

type ToggleButtonStory = StoryObj<ToggleButtonProps>

export const MainMenuToggleButton: ToggleButtonStory = {
  args: {
    faIcon: 'Bars',
    name: 'main-menu',
    onToggleHandler: () => {},
    state: false,
    label: "Toggle Main Menu",
  }
};

export const AutoFillToggleButton: ToggleButtonStory = {
  args: {
    faIcon: 'WandSparkles',
    name: 'auto-fill',
    onToggleHandler: () => {},
    state: false,
    label: "Turn on/off auto-fill",
  }
};

export const SunMoonToggleButton: ToggleButtonStory = {
  args: {
    faIcon: "Sun",
    faIconAlt: "Moon",
    name: "dark-mode-btn",
    state: false,
    label: "Turn dark mode on/off",
  }
};
