import CrosswordContextProvider from "@/context/crosswordContext";
import SquareGrid from "@/components/layouts/squareGrid/squareGrid";
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
  title: "Layouts/SquareGrid/Interactions",
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

export const GridMovement: GridStory = {
  args: {
    width: 15,
    height: 15,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');

    await step('Test click on a square that it moves the focused square and word accordingly', async () => {
      await userEvent.click(squares[10]);
      expect(squares[10]).toHaveClass('focused');
      expect(squares[10]).toHaveClass('current-word');
      canvas.getAllByRole('textbox').slice(0, 14).forEach((square) =>
        expect(square).toHaveClass('current-word')
      );
    });

    await step('Click again to toggle the orientation', async () => {
      // Click again to toggle the orientation
      await userEvent.click(squares[10]);
      expect(squares[10]).toHaveClass('focused');
      expect(squares[10]).toHaveClass('current-word');
      [...Array(15).keys()].forEach(x =>
        expect(squares[10 + (x * 15)]).toHaveClass('current-word'));

    });

    await step('Test toggling orientation using the space bar', async () => {
      // Test orientation toggling
      await userEvent.keyboard('[Space]');
      expect(squares[10]).toHaveClass('focused');
      expect(squares[10]).toHaveClass('current-word');
      canvas.getAllByRole('textbox').slice(0, 14).forEach((square) =>
        expect(square).toHaveClass('current-word')
      );
    });

    await step('Test left right arrow keyboard movement', async () => {
      await userEvent.keyboard('[ArrowRight]');
      expect(squares[11]).toHaveClass('focused');
      expect(squares[11]).toHaveClass('current-word');

      await userEvent.keyboard('[ArrowLeft]');
      expect(squares[10]).toHaveClass('focused');
    });

    await step('Test changing orientation when using up down arrow keys while across', async () => {
      await userEvent.keyboard('[ArrowDown]');
      expect(squares[10]).toHaveClass('focused');
      expect(squares[25]).toHaveClass('current-word');
    });

    await step('Test up and down arrows while in vertical orientation', async () => {
      await userEvent.keyboard('[ArrowDown]');
      expect(squares[25]).toHaveClass('focused');

      await userEvent.keyboard('[ArrowUp]');
      expect(squares[10]).toHaveClass('focused');
    });

    await step('Test movement on boundary squares', async () => {
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
    });
  },
};

export const MouseGridTests: GridStory = {
  args: {
    height: 15,
    width: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');

    await userEvent.click(squares[40]);
    expect(squares[40]).toHaveClass('focused');

    await userEvent.click(squares[45]?.querySelector('.grid-square-value') ||
                          canvasElement);
    expect(squares[45]).toHaveClass('focused');

    await userEvent.click(squares[100]?.querySelector('.grid-square-wordno') ||
                          canvasElement);
    expect(squares[100]).toHaveClass('focused');

    await userEvent.click(squares[100]?.querySelector('.grid-square-wordno') ||
                          canvasElement);
    expect(squares[100]).toHaveClass('focused');
  }
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

export const LastSquareInRowBug: GridStory = {
  args: {
    width: 15,
    height: 15,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');

    await step('When the last square in a row is focused we should be able to select items past it in the grid.', async () => {
      await userEvent.click(squares[179]);
      expect(squares[179]).toHaveClass('focused');

      await userEvent.click(squares[180]);
      expect(squares[180]).toHaveClass('focused');
    });
  },

};
