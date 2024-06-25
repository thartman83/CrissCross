import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, {SidebarMenuProps} from '@/components/containers/sidebarMenu/sidebarMenu';
import { useOpenMenu } from '@/hooks/useOpenMenu';
import Header from '@/components/composites/header/header';
import PageLayout from '@/components/containers/pageLayout/pageLayout';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import { useMenuItems } from '@/hooks/useMenuItems';
import MenuItem from '@/components/ui/menuItem/menuItem';
import HelpModal from '@/components/layouts/helpModal/helpModal';

const meta: Meta<SidebarMenuProps> = {
  title: "Integration Tests/Sidebar Menu Open Modal",
  component: SidebarMenu,
  render: () =>  {
    const {isOpenMenu, toggleOpenMenu, closeOpenMenu} = useOpenMenu(true);
    const [ isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
    const { menuItems } = useMenuItems();

    const closeHelpHandler = () => {
      setIsHelpOpen(false);
    };

    return (

      <div>
        <Header onClickHandler={toggleOpenMenu} openMainMenu={isOpenMenu} />
        <SidebarMenu openSidebar={isOpenMenu}
                     onLeaveHandler={closeOpenMenu}>
          {menuItems.map( (e, i) =>
            <MenuItem key={`mainMenuItem-${i}`} {...e}/>)}
        </SidebarMenu>
        <PageLayout openSidebar={isOpenMenu}>
          <div>I'm the main content!</div>
        </PageLayout>
        <HelpModal closeModalHandler={closeHelpHandler} isOpen={isHelpOpen}/>
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
