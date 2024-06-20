import { Meta, StoryObj } from '@storybook/react';
import MenuItem, { MenuItemProps } from './menuItem';
import { IconName } from '../faIcons';

const meta: Meta<MenuItemProps> = {
  title: "UI Elements/Menu Item/Examples",
  component: MenuItem,
  render: (args) => (
    <ul style={{listStyle: "none", backgroundColor: "var(--color-tertiary)",
                height: "5rem", width: "20rem", paddingTop: "2rem",
                paddingRight: ".5rem"}}>
      <MenuItem {...args} />
    </ul>
  ),
  argTypes: {
    faIcon: {
      options: [...Object.values(IconName)],
      control: {type: "select",},
    },
  },
};

export default meta;

type MenuItemStory = StoryObj<MenuItemProps>

export const ExampleMenuItem: MenuItemStory = {
  args: {
    text: "New Menu Item",
    onClickHandler: () => {}
  }
};


export const ExampleMenuItemIcon: MenuItemStory = {
  args: {
    text: "Icon Menu Item",
    onClickHandler: () => {},
    faIcon: "Plus"
  }
};
