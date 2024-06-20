import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, { SidebarMenuProps } from './sidebarMenu';
import { useArgs } from '@storybook/preview-api';
import MenuItem, { MenuItemProps } from '@/components/ui/menuItem/menuItem';

const meta: Meta<SidebarMenuProps> = {
  title: "Containers/Sidebar Menu/Examples",
  component: SidebarMenu,
  render: (args) => {
    const [{openSidebar}, updateArgs] = useArgs();

    const menuItems: MenuItemProps[] = [
      {
        text: "Menu Item 1",
        onClickHandler: () => {},
        faIcon: "Plus",
        focused: false,
      },
      {
        text: "Menu Item 2",
        onClickHandler: () => {},
        faIcon: "Gear",
        focused: false,
      },
      {
        text: "Menu Item 3",
        onClickHandler: () => {},
        faIcon: "Share",
        focused: false,
      },
      {
        text: "Menu Item 4",
        onClickHandler: () => {},
        faIcon: "Lock",
        focused: false,
      },
      {
        text: "Menu Item 4",
        onClickHandler: () => {},
        faIcon: "Circle",
        focused: false,
      },
    ];


    const toggleSidebarHandler = () => {
      updateArgs({openSidebar: !openSidebar });
    };

    return (
      <div>
        <SidebarMenu {...args} openSidebar={openSidebar}>
          {menuItems.map((e, i) => <MenuItem key={`mainMenuItem-${i}`} {...e} />)}
        </SidebarMenu>
        <main style={{ marginLeft: "50vw" }}>
          On screen main elements.
          <button onClick={toggleSidebarHandler}>Toggle Main Menu</button>
        </main>
      </div>
    );
  },
};

export default meta;

export type SidebarMenuStory = StoryObj<SidebarMenuProps>

export const ExampleSidebarMenu: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
};
