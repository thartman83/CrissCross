export enum GridSymmetry {
  Rotational=0,
  Horizontal,
  Vertical,
  NESWDiagonal,
  NWSEDiagonal,
  None,
};

type AppSettings = {
  height: number,
  width: number,
  gridSymmetry: GridSymmetry
};

export default AppSettings;
