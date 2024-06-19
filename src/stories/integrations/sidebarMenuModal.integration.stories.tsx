import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, {SidebarMenuProps} from '@/components/containers/sidebarMenu/sidebarMenu';
import { useOpenMenu } from '@/hooks/useOpenMenu';
import Header from '@/components/composites/header/header';
import PageLayout from '@/components/layouts/pageLayout';
import { userEvent, within } from '@storybook/testing-library';
import SettingsModal from '@/components/layouts/settingsModal/settingsModal';
import { useState } from 'react';

const meta: Meta<SidebarMenuProps> = {
  title: "Integration Tests/Sidebar Menu Open Modal",
  component: SidebarMenu,
  render: () =>  {
    const {isOpenMenu, toggleOpenMenu, closeOpenMenu} = useOpenMenu(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const closeSettingsHandler = () => {
      setIsSettingsOpen(false);
    };

    return (

      <div>
        <Header onClickHandler={toggleOpenMenu} openMainMenu={isOpenMenu} />
        <SidebarMenu openSidebar={isOpenMenu}
                     onLeaveHandler={closeOpenMenu} />
        <PageLayout openSidebar={isOpenMenu}>
          <div>I'm the main content!</div>
        </PageLayout>
        <SettingsModal isModalOpen={isSettingsOpen}
                       closeModalHandler={closeSettingsHandler}/>
      </div>
    );
  },
};

export default meta;

type SidebarMenuStory = StoryObj<SidebarMenuProps>

export const SidebarMenuFireModalTest: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const menuOptions = canvas.getAllByRole('menuitem');

    await step('Clicking on the settings option should launch the settings modal', async () => {
      await userEvent.click(menuOptions[1]);
    });
  },
};
