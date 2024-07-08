import { Meta, StoryObj } from '@storybook/react';
import LassoArea, {LassoAreaProps} from './lassoArea';
import CrosswordContextProvider from '@/context/crosswordContext';
import SquareGrid from '@/components/layouts/squareGrid/squareGrid';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta: Meta<LassoAreaProps> = {
  title: "Containers/LassoArea/Functional Tests",
  component: LassoArea,
  render: (args) => (
    <CrosswordContextProvider initArgs={{ width: 5, height: 5, autoSave: false }}>
      {
        <LassoArea {...args} >
          <SquareGrid />
        </LassoArea>
      }
    </CrosswordContextProvider>
  ),
};

export default meta;

type LassoAreaStory = StoryObj<LassoAreaProps>

export const SelectGrid: LassoAreaStory = {
  args: {

  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByRole('textbox');
    await step('When clicking on the first square then dragging to the last square, should highlight the whole grid', async () => {

      expect(squares[0]).toHaveClass('focused');
      expect(squares.every( (s, i) => i === 0 ||
                            !s.classList.contains('focused'))).toBe(true);

      await userEvent.pointer([
        { target: squares[0], keys: '[MouseLeft>]'},
        { target: squares[24]},
        {keys: '[/MouseLeft]'},
      ]);

      expect(squares.every(s => s.classList.contains('focused'))).toBe(true);
    });

    await step('Should select a portion of the grid when starting from square 12 and dragging to 23', async () => {
      await userEvent.click(squares[0]);
      expect(squares.every( (s, i) => i === 0 ||
                            !s.classList.contains('focused'))).toBe(true);

      await userEvent.pointer([
        { target: squares[12], keys: '[MouseLeft>]'},
        { target: squares[23]},
        {keys: '[/MouseLeft]'},
      ]);

      const expectedSelectArea = squares.filter((_, i) =>
        [12,13,17,18,22,23].includes(i));
      expect(expectedSelectArea.every( s => s.classList.contains('focused'))).toBe(true);
    });
  },
};
