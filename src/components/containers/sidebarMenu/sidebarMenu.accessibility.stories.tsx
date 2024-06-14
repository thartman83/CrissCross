import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, { SidebarMenuProps } from './sidebarMenu';
import { useArgs } from '@storybook/preview-api';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  title: "containers/Sidebar Menu/Accessibility Tests",
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

export const LandmarkTests: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // sidebar should use the complementary landmark
    const sidebar = canvas.getByRole('complementary');
    expect(sidebar).toBeDefined();

    // side bar should have focus
    expect(sidebar).toHaveFocus();

    // the side bar should indicate what the point of the menu is
    expect(sidebar).toHaveAttribute('aria-label', 'Main Menu');

    //sidebar should have a nav set to indicate amenu
    const nav = canvas.getByRole('navigation');
    expect(nav).toBeDefined();
  },
};

export const VisibleTests: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = await canvas.findByRole('complementary');

    // sidebar should have aria-hidden set to false when expanded
    expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    expect(sidebar).toHaveAttribute('tabIndex', "0");

  },
};

export const HiddenTests: SidebarMenuStory = {
  args: {
    openSidebar: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('complementary', {hidden: true});

    expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    expect(sidebar).toHaveAttribute('tabIndex', '-1');
  },
};
