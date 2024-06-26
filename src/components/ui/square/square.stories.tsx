import { Meta, StoryObj } from '@storybook/react';
import Square, { SquareProps } from './square';

const gridSquareSize = {"--grid-square-size": "5rem" } as React.CSSProperties;
const meta: Meta<SquareProps> = {
  title: "UI Elements/Square/Examples",
  component: Square,
  render: (args) => (
    <div style={{
      overflow: "hidden",
      width: "calc(var(--grid-square-size) + 1px)",
      height: "calc(var(--grid-square-size) + 1px)",
      paddingBottom: "var(--grid-square-border-width)",
      backgroundColor: "var(--bg-color-grid)",
      ...gridSquareSize
    }}>
      <Square {...args} />
    </div>
  ),
};

export default meta;

type SquareStory = StoryObj<SquareProps>

// Blank square
export const BlankSquare: SquareStory = {};

// Filled in Square
export const FilledSquare: SquareStory = {
  args: {
    value: 'A'
  },
};

// Focused Square
export const FocusedSquare: SquareStory = {
  args: {
    focused: true,
  }
};

export const CurrentWordSquare: SquareStory = {
  args: {
    currentWord: true
  }
};

export const LeadWordSquareBlank: SquareStory = {
  args: {
    wordNo: 1,
  },
};

export const BlockSquare: SquareStory = {
  args: {
    value: "."
  }
};

export const ErrorSquare: SquareStory = {
  args: {
    value: "",
    error: true,
  }
};
