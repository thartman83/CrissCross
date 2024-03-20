import Grid, { Orientation, Word, Words, Fill, Square, SquareState } from "../types/grid";

export const findSymmetrySquare =
  (x: number, y: number, state: Grid): { x: number, y: number } => {
    return { x: (state.width - x) - 1, y: (state.height - y) - 1 };
  };


export const initGrid = (width: number, height: number): Grid => {

  // Construct a new empty grid fill
  const newFill = Array.from({ length: height }).map((_, i) =>
    Array.from({ length: width }).map((_, j) => {
      const square: Square = {
        state: SquareState.Letter,
        value: '',
        x: i,
        y: j,
        answerNo: 0,
        focus: false,
        current: false
      };
      return square;
    })
  );

  const newGrid: Grid = {
    fill: newFill,
    height: height,
    width: width,
    answerCount: 0,
    xPos: 0,
    yPos: 0,
    orientation: Orientation.across,
    commandStack: [],
    words: [],
  };

  return fillCurrentHighlighted(fillAnswerNos(newGrid));
};

export const fillAnswerNos = (grid: Grid): Grid => {
  let answerCount = 1;

  const newFill = grid.fill.map((row: Array<Square>, i) => {
    return row.map((square: Square, j: number) => {
      const num = ((grid.fill[i][j].state !== SquareState.Block) &&
        (i == 0 || grid.fill[i - 1][j].state === SquareState.Block ||
          j == 0 || grid.fill[i][j - 1].state === SquareState.Block))
        ? answerCount++ : 0;
      return {
        ...square,
        answerNo: num
      };
    });
  });

  return {
    ...grid,
    fill: newFill,
    words: getWords(newFill)
  };
};

export const fillCurrentHighlighted = (grid: Grid): Grid => {
  let curX = grid.xPos;
  let curY = grid.yPos;
  const newFill = grid.fill.map((row, _) => row.map((square, _) => {
    return {
      ...square,
      current: false
    };
  }));

  if (grid.orientation === Orientation.across) {
    while (curY < grid.width &&
      grid.fill[curX][curY].state != SquareState.Block) {
      newFill[curX][curY] = {
        ...newFill[curX][curY],
        current: true
      };
      curY++;
    }

    curX = grid.xPos;
    curY = grid.yPos;

    while (curY >= 0 &&
      grid.fill[curX][curY].state != SquareState.Block) {
      newFill[curX][curY] = {
        ...newFill[curX][curY],
        current: true
      };
      curY--;
    }
  } else {
    while (curX < grid.width &&
      grid.fill[curX][curY].state != SquareState.Block) {
      newFill[curX][curY] = {
        ...newFill[curX][curY],
        current: true
      };
      curX++;
    }

    curX = grid.xPos;
    curY = grid.yPos;

    while (curX >= 0 &&
      grid.fill[curX][curY].state != SquareState.Block) {
      newFill[curX][curY] = {
        ...newFill[curX][curY],
        current: true
      };
      curX--;
    }
  }

  return {
    ...grid,
    fill: newFill,
  };
};

export const getNextWord =
  (row: Array<Square>, orientation: Orientation): [Word | null, Array<Square>] => {
    const word: Word = {
      squares: [],
      orientation: orientation,
      wordNo: 0
    };

    const retRow = [...row];
    let cur = retRow.shift() || null;
    while (cur !== null && cur.state != SquareState.Block) {
      if (word.wordNo == 0) {
        word.wordNo = cur.answerNo;
      }
      word.squares.push(cur);
      cur = retRow.shift() || null;
    }

    return [word.squares.length === 0 ? null : word, retRow];
  };

export const getWordsRow =
  (row: Array<Square>, orientation: Orientation): Words => {
    let words: Words = [];
    let word;
    let retRow = [...row];

    while (retRow.length > 0) {
      [word, retRow] = getNextWord(retRow, orientation);
      if (word !== null)
        words = [...words, word];
    }

    return words;
  };

export const getWords = (fill: Fill): Array<Word> => {
  const acrossWords = fill.map((row: Array<Square>, _) =>
    getWordsRow(row, Orientation.across)
  );

  // transpose the matrix for columns
  const columns = fill[0].map((_, colIndex) => fill.map(row => row[colIndex]));

  const downWords = columns.map((col: Array<Square>, _) =>
    getWordsRow(col, Orientation.down)
  );

  return Array<Word>().concat(...acrossWords).concat(...downWords);
};
