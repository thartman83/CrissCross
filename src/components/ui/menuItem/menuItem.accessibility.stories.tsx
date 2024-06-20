import { Meta, StoryObj } from '@storybook/react';
import MenuItem, {MenuItemProps} from './menuItem';

const meta: Meta<MenuItemProps> = {
  title: "UI Elements/Menu Item/Accessibility Tests",
  component: MenuItem,
  render: (args) => (
    <ul style={{listStyle: "none", backgroundColor: "var(--color-tertiary)",
                height: "5rem", width: "20rem", paddingTop: "2rem",
                paddingRight: ".5rem"}}>
      <MenuItem {...args} />
    </ul>
  ),
};

export default meta;

type MenuItemStory = StoryObj<MenuItemProps>

export const MenuItemKeyboardTest: MenuItemStory = {

};
