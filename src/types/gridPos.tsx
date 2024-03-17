export enum GridOrientation {
  Across = 0,
  Down = 1
}

type GridPos = {
  x: number;
  y: number;
  orientation: GridOrientation;
};

export default GridPos;
