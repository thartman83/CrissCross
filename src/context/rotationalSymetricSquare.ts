const RotationalSymetricSquare =
  (x: number, y: number, height: number, width: number): {x: number, y: number} => {
  return {
    x: (width - x) - 1,
    y: (height - y) - 1
  };
};

export default RotationalSymetricSquare;
