import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import SettingsModal, { SettingsModalProps } from './settingsModal';
import CrosswordContextProvider from '@/context/crosswordContext';

const meta: Meta<SettingsModalProps> = {
  title: "Layouts/SettingsModal/Examples",
  component: SettingsModal,
  render: (args) => {
    const [{}, updateArgs] = useArgs();
    const closeModalHandler = () => {
      updateArgs({ isModalOpen: false });
    };
    const height =15;
    const width = 15;

    return (
      <CrosswordContextProvider initArgs={{ ...{height: height, width: width,
                                                autoSave: false,
                                                grid: Array(height*width).fill('')}}}>
        <SettingsModal {...args} closeModalHandler={closeModalHandler}/>
      </CrosswordContextProvider>
   );
  },
};

export default meta;

type SettingsModalStory = StoryObj<SettingsModalProps>

export const SettingsModalExample: SettingsModalStory = {
  args: {
    isOpen: true,
  },
};
