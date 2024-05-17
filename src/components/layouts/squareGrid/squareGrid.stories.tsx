import CrosswordContextProvider from "@/context/crosswordContext";
import SquareGrid from "./squareGrid";
import AppContextProvider from "@/context/applicationContext";
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const Template = (args) => (

  <AppContextProvider>
    <CrosswordContextProvider
      initArgs={{
        grid: Array(args.height*args.width).fill(''),
        ...args,
      }}>
      <SquareGrid />
    </CrosswordContextProvider>
  </AppContextProvider>
);

const meta: Meta<typeof SquareGrid> = {
  title: "SquareGrid",
  component: SquareGrid,
  args: {
    height: 15,
    width: 15,
  },
};

export default meta;
type Story = StoryObj<typeof Meta>;

export const Blank15x15 = Template.bind({});
Blank15x15.args = {
  grid: Array(15*15).fill('')
};

Blank15x15.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tenthSquare =canvas.getAllByRole('textbox')[10];
  await userEvent.click(tenthSquare);
  expect(tenthSquare).toHaveClass('focused');
  expect(tenthSquare).toHaveClass('current-word');

};

export const Blank10x10 = Template.bind({});
Blank10x10.args = {
  width: 10,
  height: 10,
};

export const Blank8x8 = Template.bind({});
Blank8x8.args = {
  width: 8,
  height: 8,
};

export const Blank5x5 = Template.bind({});
Blank5x5.args = {
  width: 5,
  height: 5,
};

export const Blank5x4 = Template.bind({});
Blank5x4.args = {
  width: 5,
  height: 4,
};

export const Filled15x15 = Template.bind({});
Filled15x15.args = {
  width: 15,
  height: 15,
  grid: [
    "T","A","M","S",".",".","D","R","A","M","A","C","L","U","B",
    "I","M","A","C",".","S","E","A","S","O","N","P","A","S","S",
    "B","U","S","H",".","T","A","K","E","S","N","A","M","E","S",
    "E","S","A","U",".","I","D","E","A","T","E",".",".",".",".",
    "T","E","L","L","A","L","L",".",".",".","A","U","R","A","S",
    ".","D","A","Z","Z","L","E",".","G","O","L","D","O","R","E",
    ".",".",".",".","U","L","T","R","O","N",".","O","C","T","A",
    "S","E","C","U","R","I","T","Y","B","L","A","N","K","E","T",
    "O","A","R","S",".","F","E","E","L","I","N",".",".",".",".",
    "D","R","E","S","S","E","R",".","I","N","T","A","C","T",".",
    "A","L","E","R","T",".",".",".","N","E","E","D","L","E","S",
    ".",".",".",".","E","N","I","G","M","A",".","M","O","P","E",
    "F","R","E","E","P","E","R","I","O","D",".","I","S","E","E",
    "C","A","R","G","O","H","O","L","D","S",".","R","E","E","D",
    "C","H","R","O","N","I","C","L","E",".",".","E","T","S","Y"
  ]
};
