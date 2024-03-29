import Coords from "./coords";
import Orientation from "./orientation";

type Crossword = {
  title: string,
  author: string,
  position: Coords,
  orientation: Orientation,
  height: number,
  width: number,
  grid: Array<Array<string>>
};

export default Crossword;
