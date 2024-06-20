import { Meta, StoryObj } from '@storybook/react';
import MenuItem, {MenuItemProps} from './menuItem';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const mockClickHandler = fn();

const meta: Meta<MenuItemProps> = {
  title: "UI Elements/Menu Item/Functional Tests",
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

export const MenuItemClickTest: MenuItemStory = {
  args: {
    onClickHandler: mockClickHandler,
    text: "Test Menu Item",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const menuItem = canvas.getByRole('menuitem');
    await step('Clicking on the menu item should fire the click handler',
      async () => {
        await userEvent.click(menuItem);
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });
  },

};
