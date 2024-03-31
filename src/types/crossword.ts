import Coords from "./coords";
import Orientation from "./orientation";

type Crossword = {
  title: string,
  author: string,
  position: Coords,
  orientation: Orientation,
  height: number,
  width: number,
  grid: Array<Array<string>>,
  // clues: {
  //   acrosses: {
  //     [key: number]: string
  //   },
  //   downs: {
  //     [key: number]: string
  //   }
  // }
};

export default Crossword;
