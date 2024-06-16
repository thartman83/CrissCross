import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import SettingsModal, { SettingsModalProps } from './settingsModal';

const meta: Meta<SettingsModalProps> = {
  title: "Layouts/SettingsModal/Examples",
  component: SettingsModal,
  render: (args) => {
    const [{}, updateArgs] = useArgs();
    const closeModalHandler = () => {
      updateArgs({ isModalOpen: false });
    };

   return (
     <SettingsModal {...args} closeModalHandler={closeModalHandler}/>
   );
  },
};

export default meta;

type SettingsModalStory = StoryObj<SettingsModalProps>

export const SettingsModalExample: SettingsModalStory = {
  args: {
    isModalOpen: true,
  },
};
