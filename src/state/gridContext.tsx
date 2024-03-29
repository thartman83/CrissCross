import Grid, { Orientation } from "../types/grid";
import { createContext } from "react";

export const GridContext = createContext<Grid>({
  height: 15,
  width: 15,
  fill: [],
  orientation: Orientation.across,
  x: 0,
  y: 0,
  words: [],
  currentWordIdx: -1
});
