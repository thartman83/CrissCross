import { within } from "@storybook/testing-library";
import baseMeta, {MenuStory} from "./menu.examples.stories";
import { expect } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";

const meta: typeof baseMeta = {
  ...baseMeta,
  title: "Containers/Menu/Functional Tests",
};

export default meta;

export const ActiveMenuFocus: MenuStory = {
  args: {
    active: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const menuList = canvas.getByRole('menu');
    const menuItems = await canvas.findAllByRole('menuitem');

    await step('When the menu gets focus, the first element should be focused',
      async () => {
        await userEvent.pointer({target: menuItems[0]});
        expect(menuList).toBeDefined();
        expect(menuItems[0]).toHaveFocus();
        expect(menuItems[0]).toHaveAttribute('tabIndex', '0');
    });
  },
};

export const KeyboardMovement: MenuStory = {
  args: {
    active: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const menuItems = await canvas.findAllByRole('menuitem');
    const lastIdx = menuItems.length - 1;

    await step(`When the menu is open and the down key is pressed,
                it should move to the next menu item`,
      async () => {
        await userEvent.pointer({target: menuItems[0]});
        expect(menuItems[0]).toHaveFocus();
        await userEvent.keyboard('[ArrowDown]');
        expect(menuItems[1]).toHaveFocus();
        await userEvent.keyboard('[ArrowDown]');
        expect(menuItems[2]).toHaveFocus();
        await userEvent.keyboard('[ArrowDown]');
        expect(menuItems[3]).toHaveFocus();
        await userEvent.keyboard('[ArrowDown]');
        expect(menuItems[4]).toHaveFocus();
    });

    await step(`When the last item is focused and down is pressed
               it should move to the first element`,
      async () => {
        await userEvent.keyboard('[ArrowDown]');
        expect(menuItems[0]).toHaveFocus();
    });

    await step(`When the first item is focused and up is pressed it
                should move to the last element`,
      async () => {
        await userEvent.keyboard('[ArrowUp]');
        expect(menuItems[lastIdx]).toHaveFocus();
      });

    await step(`When the up key is press it should move up in the menu items`,
      async () => {
        expect(menuItems[lastIdx]).toHaveFocus();
        await userEvent.keyboard('[ArrowUp]');
        expect(menuItems[lastIdx - 1]).toHaveFocus();
        await userEvent.keyboard('[ArrowUp]');
        expect(menuItems[lastIdx - 2]).toHaveFocus();
    });
  },
};
