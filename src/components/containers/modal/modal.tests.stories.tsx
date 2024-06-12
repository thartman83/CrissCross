import { Meta, StoryObj } from '@storybook/react';
import Modal, {ModalProps} from './modal';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useArgs } from '@storybook/preview-api';
import { userEvent } from '@testing-library/user-event';

const meta: Meta<ModalProps> = {
  title: "Containers/Modal/Tests",
  component: Modal,
  render: (args) => {
    const [{isOpen}, updateArgs ] = useArgs();
    const closeModalHandler = () => {
      updateArgs({ isOpen: false });
    };

    const openModalHandler = () => {
      updateArgs({ isOpen: true });
    };

    return (
      <div>
        <button onClick={openModalHandler}>Open Modal</button>
        <Modal {...args} closeModalHandler={closeModalHandler} />
      </div>
    );
  },
};

export default meta;

type ModalStory = StoryObj<ModalProps>

export const HiddenModalAccessibilityTests: ModalStory = {
  args: {
    isOpen: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modal = canvas.getByRole('dialog', {hidden: true});

    expect(modal).toBeDefined();
    expect(modal).toHaveAttribute('aria-hidden', 'true');
  },
};

export const ShownModalAccesibilityTests: ModalStory = {
  args: {
    isOpen: false,
    title: "A Modal",
    children: "Shown Modal",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openModalBtn = canvas.getByText('Open Modal');

    await userEvent.click(openModalBtn);
    const modal = await canvas.findByRole('dialog');

    expect(modal).toBeDefined();

    // When the modal is shown it should have an aria-hidden value of false
    expect(modal).toHaveAttribute('aria-hidden', 'false');

    // When the modal is shown the root of the page should have aria-hidden set
    // to true


    const closeBtn = canvas.getByRole('button', { name: "close dialog" });

    // The first element of the modal should have focus in this case the
    // close button
    expect(closeBtn).toHaveFocus();
  },
};
