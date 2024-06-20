import { Meta, StoryObj } from '@storybook/react';
import Menu, {MenuProps} from './menu';
import { useMenuItems } from '@/hooks/useMenuItems';
import { fn } from '@storybook/test';
import MenuItem from '@/components/ui/menuItem/menuItem';

const MockClickHandlers = [];

const meta: Meta<MenuProps> = {
  title: "Containers/Menu/Examples",
  component: Menu,
  render: (args) => {
    const {menuItems} = useMenuItems();
    const children = menuItems.map((e) => {
      MockClickHandlers.push(fn());
      return <MenuItem faIcon={e.faIcon} text={e.text}
                       onClickHandler={e.onClickHandler} focused={false} />;
    });

    return (
      <div style={{ width: "20rem",
                    backgroundColor: "var(--color-quaternary)",
                    paddingBottom: "1rem",
                    paddingTop: "1rem",
                    paddingRight: ".5rem",
                  }}>
        <Menu {...args}>
          {children}
        </Menu>
      </div>
    );
  },
};

export default meta;

export type MenuStory = StoryObj<MenuProps>

export const MenuExample: MenuStory = {
  args: {

  }
};
