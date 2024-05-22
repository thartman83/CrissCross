import CrosswordContextProvider from "@/context/crosswordContext";
import SquareGrid from "./squareGrid";
import AppContextProvider from "@/context/applicationContext";
import { Meta, StoryObj } from '@storybook/react';

type GridProps = React.ComponentProps<typeof SquareGrid> & {
  width: number,
  height: number,
  grid?: string[],
};

const meta: Meta<GridProps> = {
  title: "Layouts/SquareGrid/Examples",
  component: SquareGrid,
  args: {
    height: 15,
    width: 15,
  },
  render: ({ height, width, grid }) => (
    <AppContextProvider>
      <CrosswordContextProvider
        initArgs={{
          ...{height: height, width: width,
              grid: grid || Array(height*width).fill('')},
        }}>
        <SquareGrid />
      </CrosswordContextProvider>
    </AppContextProvider>
  ),
};

export default meta;

type GridStory = StoryObj<GridProps>

// Basic 15 by 15 grid
export const Blank15x15: GridStory =  {
  args: {
    width: 15,
    height: 15,
  }
};

// Blank 10x10 grid
export const Blank10x10: GridStory = {
  args: {
    width: 10,
    height: 10,
  },
};

// Blank 8x8 grid (midi)
export const Blank8x8: GridStory = {
  args: {
    width: 8,
    height: 8,
  },
};

// Blank mini grid (5x5)
export const Blank5x5: GridStory = {
  args: {
    width: 5,
    height: 5,
  },
};

// Blank mini grid (5x4)
export const Blank5x4: GridStory = {
  args: {
    width: 5,
    height: 4,
  },
};

export const Filled15x15: GridStory = {
  args: {
    width: 15,
    height: 15,
    grid: [
      "T", "A", "M", "S", ".", ".", "D", "R", "A", "M", "A", "C", "L", "U", "B",
      "I", "M", "A", "C", ".", "S", "E", "A", "S", "O", "N", "P", "A", "S", "S",
      "B", "U", "S", "H", ".", "T", "A", "K", "E", "S", "N", "A", "M", "E", "S",
      "E", "S", "A", "U", ".", "I", "D", "E", "A", "T", "E", ".", ".", ".", ".",
      "T", "E", "L", "L", "A", "L", "L", ".", ".", ".", "A", "U", "R", "A", "S",
      ".", "D", "A", "Z", "Z", "L", "E", ".", "G", "O", "L", "D", "O", "R", "E",
      ".", ".", ".", ".", "U", "L", "T", "R", "O", "N", ".", "O", "C", "T", "A",
      "S", "E", "C", "U", "R", "I", "T", "Y", "B", "L", "A", "N", "K", "E", "T",
      "O", "A", "R", "S", ".", "F", "E", "E", "L", "I", "N", ".", ".", ".", ".",
      "D", "R", "E", "S", "S", "E", "R", ".", "I", "N", "T", "A", "C", "T", ".",
      "A", "L", "E", "R", "T", ".", ".", ".", "N", "E", "E", "D", "L", "E", "S",
      ".", ".", ".", ".", "E", "N", "I", "G", "M", "A", ".", "M", "O", "P", "E",
      "F", "R", "E", "E", "P", "E", "R", "I", "O", "D", ".", "I", "S", "E", "E",
      "C", "A", "R", "G", "O", "H", "O", "L", "D", "S", ".", "R", "E", "E", "D",
      "C", "H", "R", "O", "N", "I", "C", "L", "E", ".", ".", "E", "T", "S", "Y"
    ],
  }
};
