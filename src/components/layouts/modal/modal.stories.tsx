import { Meta, StoryObj } from '@storybook/react';
import Modal, {ModalProps, ModalSize} from './modal';

const meta: Meta<ModalProps> = {
  title: "Layouts/Modal",
  component: Modal,
  argTypes: {
    size: {
      options: [...Object.values(ModalSize)],
      control: {type: "select",},
    },
  }
};

export default meta;

type ModalStory = StoryObj<ModalProps>

export const ExampleModal: ModalStory = {
  args: {
    title: "Example Modal",
    isOpen: true,
    children: <p>Example Modal Contents</p>,
    closeModalHandler: () => {},
    size: ModalSize.Medium,
  },
};

export const ExampleSmallModal: ModalStory = {
  args: {
    title: "Example Small Modal",
    isOpen: true,
    children: <p>Small Modal Contents</p>,
    closeModalHandler: () => {},
    size: ModalSize.Small,
  },
};

export const ExampleLargeModal: ModalStory = {
  args: {
    title: "Example Large Modal",
    isOpen: true,
    children: <p>Large Modal Contents</p>,
    closeModalHandler: () => {},
    size: ModalSize.Large,
  },
};
