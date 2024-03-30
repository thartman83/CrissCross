const RotationalSymetricSquare =
  (x: number, y: number, height: number, width: number): {x: number, y: number} => {
  return {
    x: (height - x) - 1,
    y: (width - y) - 1
  };
};

export default RotationalSymetricSquare;
