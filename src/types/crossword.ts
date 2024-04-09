import Coords from "./coords";
import Orientation from "./orientation";

export type CrosswordGrid = Array<Array<string>>

type Crossword = {
  title: string,
  author: string,
  position: Coords,
  orientation: Orientation,
  height: number,
  width: number,
  grid: CrosswordGrid,
};

export default Crossword;
