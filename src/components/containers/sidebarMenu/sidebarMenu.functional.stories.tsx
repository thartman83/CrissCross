import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import baseMeta, {SidebarMenuStory} from "./sidebarMenu.stories";
const onLeaveHandlerMock = fn();

const meta: typeof baseMeta = {
  ...baseMeta,
  title: "containers/Sidebar Menu/Functional Tests",
};

export default meta;

export const BlurMouseTest: SidebarMenuStory = {
  args: {
    openSidebar: true,
    onLeaveHandler: onLeaveHandlerMock,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('complementary');
    const menuItems = canvas.getAllByRole('menuitem');
    const main = canvas.getByRole('main');

    await step('When the sidebar is active the first menu element should have focus', async () => {
      expect(sidebar).toBeDefined();
      expect(menuItems[0]).toHaveFocus();
      expect(onLeaveHandlerMock).toHaveBeenCalledTimes(0);

    });

    await step('When a user clicks off the menu it should fire the leave handler', async () => {
      await userEvent.click(main);
      expect(onLeaveHandlerMock).toHaveBeenCalledTimes(1);
    });


  },
};

export const BlurKeyboardTest: SidebarMenuStory = {
  args: {
    openSidebar: true,
    onLeaveHandler: onLeaveHandlerMock,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = await canvas.findByRole('complementary');
    const menuItems = await canvas.findAllByRole('menuitem');

    await step('When the user tabs out of the menu it should fire the leave handler', async () => {
      expect(sidebar).toHaveAttribute('aria-hidden', 'false');
      menuItems[0].focus();

      expect(onLeaveHandlerMock).not.toHaveBeenCalled();

      await userEvent.keyboard('[Tab]');
      expect(onLeaveHandlerMock).toHaveBeenCalledTimes(1);
    });
  },
};
