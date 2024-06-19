import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, {SidebarMenuProps} from '@/components/containers/sidebarMenu/sidebarMenu';
import Header from '@/components/composites/header/header';
import PageLayout from '@/components/layouts/pageLayout';
import { within } from '@storybook/test';
import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useOpenMenu } from '@/hooks/useOpenMenu';
import MenuItem from '@/components/ui/menuItem/menuItem';

const meta: Meta<SidebarMenuProps> = {
  title: "Integration Tests/Sidebar and Header",
  component: SidebarMenu,
  render: () => {
    const { menuItems } = useMenuItems();
    const { isOpenMenu, toggleOpenMenu, closeOpenMenu } = useOpenMenu(false);

    return (
      <div>
        <Header onClickHandler={toggleOpenMenu} openMainMenu={isOpenMenu} />
        <SidebarMenu openSidebar={isOpenMenu} onLeaveHandler={closeOpenMenu}>
          {menuItems.map((e, i) =>
            <MenuItem key={`mainMenuItem-${i}`} {...e} />)}
        </SidebarMenu>
        <PageLayout openSidebar={isOpenMenu}>
          <div>I'm the main content!</div>
        </PageLayout>
      </div>
    );
  },
};

export default meta;

type HeaderSidebarSotry = StoryObj<SidebarMenuProps>

export const HeaderClickShowHide: HeaderSidebarSotry = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button');
    const sidebar = canvas.getByRole('complementary', {hidden: true});

    await step('Check the start state of a closed sidebar', async () => {
      expect(sidebar).toHaveAttribute('aria-hidden', "true");
      expect(sidebar).toHaveClass('menu-closed');
    });


    await step('Open the sidebar menu', async () => {
      await userEvent.click(btn);
      expect(sidebar).toHaveAttribute('aria-hidden', 'false');
      expect(sidebar).toHaveClass('menu-open');
    });

    await step('Close the sidebar menu', async () => {
      await userEvent.click(btn);

      expect(sidebar).toHaveAttribute('aria-hidden', "true");
      expect(sidebar).toHaveClass('menu-closed');
    });
  },
};

export const HeaderClickElseWhereShowHide: HeaderSidebarSotry = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button');
    const sidebar = canvas.getByRole('complementary', {hidden: true});
    const main = canvas.getByRole('main');

    await step('Open the menu using the header button', async () => {
      await userEvent.click(btn);
      expect(sidebar).toHaveAttribute('aria-hidden', 'false');
      expect(sidebar).toHaveClass('menu-open');
    });

    await step('Close the sidebar by clicking off the sidebar', async () => {
      await userEvent.click(main);
      const sidebar = await canvas.findByRole('complementary', {hidden: true});

      expect(sidebar).toHaveAttribute('aria-hidden', 'true');
      expect(sidebar).toHaveClass('menu-closed');
    });
  },
};

export const HeaderKeyboardShowHide: HeaderSidebarSotry = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('checkbox');
    const sidebar = canvas.getByRole('complementary', { hidden: true});

    await step('When the header is toggled by the keyboard the menu should toggle as well', async () => {
      toggleButton.focus();
      await userEvent.keyboard('[Space]');
      expect(sidebar).toHaveAttribute('aria-hidden', 'false');
      expect(sidebar).toHaveClass('menu-open');
    });

    await step('When the sidebar loses keyboard focus via shift tab, it should close and focus should be on the header', async () => {
      await userEvent.tab({shift: true});
      expect(toggleButton).toHaveFocus();
      expect(sidebar).toHaveAttribute('aria-hidden', 'true');
      expect(sidebar).toHaveClass('menu-closed');
    });
  },
};
