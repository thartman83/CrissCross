import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, {SidebarMenuProps} from './sidebarMenu';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { useArgs } from '@storybook/preview-api';
import { expect } from '@storybook/jest';

const onLeaveHandlerMock = fn();

const menuItems = [
  {
    text: "Menu Item 1",
    onClickHandler: () => {},
    faIcon: "Plus",
  },
  {
    text: "Menu Item 2",
    onClickHandler: () => {},
    faIcon: "Gear",
  },
  {
    text: "Menu Item 3",
    onClickHandler: () => {},
    faIcon: "Share",
  },
  {
    text: "Menu Item 4",
    onClickHandler: () => {},
    faIcon: "Lock",
  },
  {
    text: "Menu Item 4",
    onClickHandler: () => {},
    faIcon: "Circle",
  },
];

const meta: Meta<SidebarMenuProps> = {
  title: "containers/Sidebar Menu/Functional Tests",
  component: SidebarMenu,
  render: (args) => {
    const [{openSidebar}, updateArgs] = useArgs();

    const toggleSidebarHandler = () => {
      updateArgs({openSidebar: !openSidebar });
    };
    return (
      <div>
        <SidebarMenu {...args} menuItems={menuItems} openSidebar={openSidebar} />
        <main style={{ marginLeft: "50vw" }}>
          On screen main elements.
          <button onClick={toggleSidebarHandler}>Toggle Main Menu</button>
        </main>
      </div>
    );
  },
};

export default meta;

type SidebarMenuStory = StoryObj<SidebarMenuProps>

export const BlurMouseTest: SidebarMenuStory = {
  args: {
    openSidebar: true,
    onLeaveHandler: onLeaveHandlerMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('complementary');

    const main = canvas.getByRole('main');

    expect(sidebar).toBeDefined();
    expect(sidebar).toHaveFocus();
    expect(onLeaveHandlerMock).toHaveBeenCalledTimes(0);

    // When a user clicks off of the menu it should fire the blur
    // function
    await userEvent.click(main);

    expect(onLeaveHandlerMock).toHaveBeenCalledTimes(1);
  },
};

export const BlurKeyboardTest: SidebarMenuStory = {
  args: {
    openSidebar: true,
    onLeaveHandler: onLeaveHandlerMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = await canvas.findByRole('complementary');

    expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    expect(sidebar).toHaveAttribute('tabIndex', '0');

    expect(onLeaveHandlerMock).not.toHaveBeenCalled();

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');

    expect(onLeaveHandlerMock).toHaveBeenCalledTimes(1);
  },
};
