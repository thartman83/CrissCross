import CrosswordContextProvider from "@/context/crosswordContext";
import SquareGrid from "./squareGrid";
import AppContextProvider from "@/context/applicationContext";
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

type GridProps = React.ComponentProps<typeof SquareGrid> & {
  width: number,
  height: number,
  grid?: string[],
};

const meta: Meta<GridProps> = {
  title: "SquareGrid",
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

export const GridMovement: GridStory = {
  args: {
      width: 15,
    height: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');

    // test clicking on a square that it moves the focused square, word accordingly
    await userEvent.click(squares[10]);
    expect(squares[10]).toHaveClass('focused');
    expect(squares[10]).toHaveClass('current-word');
    canvas.getAllByRole('textbox').slice(0, 14).forEach((square) =>
      expect(square).toHaveClass('current-word')
    );

    // Click again to toggle the orientation
    await userEvent.click(squares[10]);
    expect(squares[10]).toHaveClass('focused');
    expect(squares[10]).toHaveClass('current-word');
    [...Array(15).keys()].forEach(x =>
      expect(squares[10 + (x * 15)]).toHaveClass('current-word'));

    // Test orientation toggling
    await userEvent.keyboard('[Space]');
    expect(squares[10]).toHaveClass('focused');
    expect(squares[10]).toHaveClass('current-word');
    canvas.getAllByRole('textbox').slice(0, 14).forEach((square) =>
      expect(square).toHaveClass('current-word')
    );

    // Test WASD
    await userEvent.keyboard('[ArrowRight]');
    expect(squares[11]).toHaveClass('focused');
    expect(squares[11]).toHaveClass('current-word');

    await userEvent.keyboard('[ArrowLeft]');
    expect(squares[10]).toHaveClass('focused');

    // Current orientation should be across, down should change orientation to down
    // and the actual position should remain the same
    await userEvent.keyboard('[ArrowDown]');
    expect(squares[10]).toHaveClass('focused');
    expect(squares[25]).toHaveClass('current-word');

    // Repeating down should move the focus down
    await userEvent.keyboard('[ArrowDown]');
    expect(squares[25]).toHaveClass('focused');

    // Return to the tenth square
    await userEvent.keyboard('[ArrowUp]');
    expect(squares[10]).toHaveClass('focused');

    // test boundary movement
    await userEvent.click(squares[0]);
    await userEvent.keyboard('[ArrowLeft]');
    expect(squares[0]).toHaveClass('focused');

    await userEvent.keyboard('[ArrowUp]');
    expect(squares[0]).toHaveClass('focused');

    await userEvent.click(squares[15 * 15 - 1]);
    await userEvent.keyboard('[ArrowRight]');
    expect(squares[15 * 15 - 1]).toHaveClass('focused');

    await userEvent.keyboard('[ArrownDown]');
    expect(squares[15 * 15 - 1]).toHaveClass('focused');
  },
};


export const BlockSquareTests: GridStory = {
  args: {
    width: 15,
    height: 15,
  },
  play: async ({ canvasElement }) => {
    // For this test we are going to assume using rotational symetry
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');

    const hasWordNo = (square: HTMLElement, wordNo: number) => {
      debugger;
      const wordNoLabel = square.querySelector('.grid-square-wordno');
      return wordNoLabel?.textContent === wordNo.toString();
    };

    // given a blank grid, wordnos should be 1-15 on the first row and
    // 1, 16-29 in the first column
    [...Array(15).keys()].forEach(i => {
      expect(hasWordNo(squares[i], i + 1)).toBeTruthy();
    });

    [...Array(14).keys()].forEach(i => {
      expect(hasWordNo(squares[(i + 1) * 15], i + 16)).toBeTruthy();
    });

    await userEvent.click(squares[0]);
    await userEvent.click(squares[0]);
    await userEvent.keyboard('.');
    expect(squares[0]).toHaveClass('block');
    expect(squares[15 * 15 - 1]).toHaveClass('block');

    [...Array(14).keys()].forEach(i => {
      expect(hasWordNo(squares[i + 1], i + 1)).toBeTruthy();
    });

    [...Array(13).keys()].forEach(i => {
      expect(hasWordNo(squares[(i + 1) * 15], i + 15)).toBeTruthy();
    });

    // lets make a utah
    await userEvent.keyboard('.');
    expect(squares[1]).toHaveClass('block');
    expect(squares[15 * 15 - 2]).toHaveClass('block');

    await userEvent.keyboard('.[ArrowDown][ArrowDown][ArrowLeft][ArrowLeft][ArrowLeft][ArrowLeft].');
    expect(squares[2]).toHaveClass('block');
    expect(squares[15]).toHaveClass('block');
    expect(squares[15 * 15 - 3]).toHaveClass('block');
    expect(squares[15 * 14 + 14]).toHaveClass('block');
    expect(hasWordNo(squares[16], 13)).toBeTruthy();
    expect(hasWordNo(squares[17], 14)).toBeTruthy();
  }
};

export const LettersTests: GridStory = {
  args: {
    width: 15,
    height: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');
    const typedWord = 'recommendations';

    await userEvent.click(squares[0]);
    await userEvent.click(squares[0]);
    await userEvent.keyboard(typedWord);
    [...typedWord].forEach((l, idx) => {
      const squareLbl = squares[idx].querySelector('.grid-square-value');
      expect(squareLbl?.textContent?.toLowerCase()).toEqual(l);
    });

    await userEvent.keyboard('[Backspace][ArrowRight].');

  }

};
