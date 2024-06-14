import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, { SidebarMenuProps } from './sidebarMenu';

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
  title: "Containers/Sidebar Menu",
  component: SidebarMenu,
  render: (args) =>
  {
    return (
        <SidebarMenu {...args} />
    );
  },
};

export default meta;

type SidebarMenuStory = StoryObj<SidebarMenuProps>

export const ExampleSidebarMenu: SidebarMenuStory = {
  args: {
    menuItems: menuItems,
    openSidebar: true,
  },
};
