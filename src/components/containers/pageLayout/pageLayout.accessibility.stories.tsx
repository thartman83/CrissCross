import { Meta, StoryObj } from '@storybook/react';
import PageLayout, {PageLayoutProps} from './pageLayout';
import { within } from '@testing-library/react';
import { expect } from '@storybook/jest';

const meta: Meta<PageLayoutProps> = {
  title: "Containers/Page Layout/Accessibility Tests",
  component: PageLayout,
  render: (args) => (
    <PageLayout {...args}>
      <div></div>
    </PageLayout>
  ),
};

export default meta;

type PageLayoutStory = StoryObj<PageLayoutProps>

export const LandmarkTest: PageLayoutStory = {
  args: {

  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const mainPage = canvas.getByRole('main');

    await step('Main Landmark should exist', async () => {
      expect(mainPage).toBeDefined();
    });
  },
};
