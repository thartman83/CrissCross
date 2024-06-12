import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

const ToggleOrientationCommand = () => {
  return {
    do: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        orientation: crossword.orientation === Orientation.across ?
          Orientation.down : Orientation.across
      };
    },
    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        orientation: crossword.orientation === Orientation.across ?
          Orientation.down : Orientation.across
      };
    }
  };
};

export default ToggleOrientationCommand;
