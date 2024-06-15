import { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from '@/components/composites/header/header';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';
import { fn } from '@storybook/test';

const onClickHandlerMock = fn();

const meta: Meta<HeaderProps> = {
  title: "Composite Elements/Header/Functional Tests",
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

export const CrissCrossClickHeader: HeaderStory = {
  args: {
    onClickHandler: onClickHandlerMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleElements = canvas.getAllByRole("button", {hidden:true});

    expect(toggleElements).toBeDefined();
    expect(toggleElements.length).toEqual(2);

    await userEvent.click(toggleElements[0]);
    expect(onClickHandlerMock).toHaveBeenCalledTimes(1);

    await userEvent.click(toggleElements[0]);
    expect(onClickHandlerMock).toHaveBeenCalledTimes(2);

    // check that the parent element can be clicked as well
    const parentElement = toggleElements[0].parentElement;
    if(parentElement)
      await userEvent.click(parentElement);
    else
      expect(false);

    expect(onClickHandlerMock).toHaveBeenCalledTimes(3);

  }
};
