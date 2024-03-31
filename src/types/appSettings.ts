export enum GridSymmetry {
  Rotational="Rotational",
  Horizontal="Horizonal",
  Vertical="Veritcatl",
  NESWDiagonal="NESWDiagonal",
  NWSEDiagonal="NWSEDiagonal",
  None="None",
};

type AppSettings = {
  height: number,
  width: number,
  gridSymmetry: GridSymmetry
};

export default AppSettings;
