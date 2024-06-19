import baseMeta, {SidebarMenuStory} from "./sidebarMenu.stories";
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: typeof baseMeta = {
  ...baseMeta,
  title: "containers/Sidebar Menu/Accessibility Tests",
};

export default meta;

export const LandmarkTests: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // sidebar should use the complementary landmark
    const sidebar = canvas.getByRole('complementary');

    await step('Expect the main menu landmarks to exist', async () => {
      expect(sidebar).toBeDefined();

      // the side bar should indicate what the point of the menu is
      expect(sidebar).toHaveAttribute('aria-label', 'Main Menu');

      //sidebar should have a nav set to indicate amenu
      const nav = canvas.getByRole('navigation');
      expect(nav).toBeDefined();
    });

  },
};

export const VisibleTests: SidebarMenuStory = {
  args: {
    openSidebar: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = await canvas.findByRole('complementary');

    await step('When the sidebar is open aria-hidden should be false', async () => {
      expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    });
  },
};

export const HiddenTests: SidebarMenuStory = {
  args: {
    openSidebar: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('complementary', {hidden: true});
    await step('When the side bar is closed aria-hidden should be true',
      async () => {
        expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    });
  },
};
