import Square, { SquareProps } from './square';

const gridSquareSize = {"--grid-square-size": "5rem" } as React.CSSProperties;
const SquareTemplate = (args: SquareProps) =>
      <div style={{
        overflow: "hidden",
        width: "var(--grid-square-size)",
        height: "var(--grid-square-size)",
        paddingBottom: "var(--grid-square-border-width)",
        paddingRight: "var(--grid-square-border-width)",
        ...gridSquareSize
      }}>
        <Square {...args} />
      </div>;

export default {
  title: "Square",
  component: Square,
  argTypes: {
    darkMode: { type: "boolean", defaultValue: false}
  },
};

// Blank square
export const BlankSquare = SquareTemplate.bind({});

// Filled in Square
export const FilledSquare = SquareTemplate.bind({});
FilledSquare.args = {
  value: 'A'
};

// Focused Square
export const FocusedSquare = SquareTemplate.bind({});
FocusedSquare.args = {
  focused: true
};

export const CurrentWordSquare = SquareTemplate.bind({});
CurrentWordSquare.args = {
  currentWord: true
};

export const LeadWordSquareBlank = SquareTemplate.bind({});
LeadWordSquareBlank.args = {
  wordNo: 1
};

export const BlockSquare = SquareTemplate.bind({});
BlockSquare.args = {
  value: "."
};
