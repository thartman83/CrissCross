import { expect } from '@storybook/jest';
import baseMeta, {MenuStory} from './menu.examples.stories';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';

const meta: typeof baseMeta = {
  ...baseMeta,
  title: "Containers/Menu/Accessibility Tests",
};

export default meta;

export const TabIndexTests: MenuStory = {
  args: {
    active: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const menuList = canvas.getByRole('menu');
    const menuItems = await canvas.findAllByRole('menuitem');

    await step('When the menu gets focus, the first element should have a tab index of 0, all others should have tab index of -1', async () => {
      expect(menuList).toBeDefined();
      expect(menuItems[0]).toHaveFocus();

      menuItems.forEach((e, i) => {
        i === 0 ? expect(e).toHaveAttribute('tabIndex', '0') :
                  expect(e).toHaveAttribute('tabIndex', '-1');
      });
    });

    await step('When the focused menu item is changed, the tab index should update to 0 and -1 for all others ', async () => {
      await userEvent.keyboard('[ArrowDown]');

      menuItems.forEach((e, i) => {
        expect(e).toHaveAttribute('tabIndex',
                                  i === 1 ? "0" : "-1");
      });

      await userEvent.keyboard('[ArrowDown]');

      menuItems.forEach((e, i) => {
        expect(e).toHaveAttribute('tabIndex',
                                  i === 2 ? "0" : "-1");
      });
    });
  },
};
