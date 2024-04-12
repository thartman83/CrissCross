const RotationalSymetricSquare =
  (pos: number, height: number, width: number): number => {

    const x = pos % width;
    const y = Math.floor(pos / height);
    const newX = (width - y) - 1;
    const newY = (height - x) - 1;

    return newY + newX * width;
};

export default RotationalSymetricSquare;
