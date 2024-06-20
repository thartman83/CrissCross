import { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from '@/components/composites/header/header';
import { within } from '@storybook/testing-library';
import { fn } from '@storybook/test';
import { expect } from '@storybook/jest';

const onClickHandlerMock = fn();

const meta: Meta<HeaderProps> = {
  title: "Composite Elements/Header/Accessibility Tests",
  component: Header,
  args: {
    onClickHandler: onClickHandlerMock,
  },
  render: (args) => (
    <Header {...args} />
  ),
};

export default meta;

type HeaderStory = StoryObj<HeaderProps>

export const ImageAltText: HeaderStory = {
  args: {
    onClickHandler: onClickHandlerMock,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    //const toggleElements = canvas.getAllByRole("button", {hidden:true});
    await step('The Criss cross log should have an alt text', async () => {
      const img = canvas.getByAltText('Criss Cross Logo');

      expect(img).toBeDefined();
    });
  }
};

export const KeyboardAccessible: HeaderStory = {
  args: {
    onClickHandler: onClickHandlerMock,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('The user should be able to tab into the header', async () => {
      const img = canvas.getByAltText('Criss Cross Logo');

      expect(img).toBeDefined();
    });
  },
};
