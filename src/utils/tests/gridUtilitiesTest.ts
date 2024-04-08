//import { getNextWord, getWordByPosition,
//         getWordsRow, initGrid } from "../gridUtilities";
//import Grid, { Orientation, Fill, SquareState } from "../../types/grid";

//type Matrix = Array<Array<[number,number]>>;
//type FillMatrix = Array<Array<number>>;

// helper
// const matrix2Fill = (matrix: Matrix): Fill => {
//   return matrix.map((row: Array<[number, number]>, i: number) => {
//     return row.map((s: [number, number], j: number) => {
//       const [state, wordNo] = s;

//       return {
//         state: state === 1 ? SquareState.Block : SquareState.Letter,
//         answerNo: wordNo,
//         x: i,
//         y: j,
//         current: false,
//         focus: false,
//         value: ''
//       };
//     });
//   });
// };

// // const matrix2Gird = (matrix: FillMatrix): Grid => {
// //   const fill: Fill = matrix.map((row: Array<number>, i: number) => {
// //     return row.map((s: number, j: number) => {
// //       return {
// //         state: s === 1 ? SquareState.Block : SquareState.Letter,
// //         answerNo: 0,
// //         x: i,
// //         y: j,
// //         current: false,
// //         focus: false,
// //         value: ''
// //       };
// //     });
// //   });

// //   return fillAnswerNos({
// //     fill: fill,
// //     xPos: 0,
// //     yPos: 0,
// //     orientation: Orientation.across,
// //     width: fill.length,
// //     height: fill[0].length,
// //     answerCount: 0,
// //     commandStack: [],
// //     words: [],
// //     currentWordIdx: 0,
// //   });
// // }


// describe('gridUtilites unit tests', () => {
//   describe('getNextWord tests', () => {
//     it('should have 1 word for a row with no black squares', () => {
//       const row = Array.apply(null, Array(15)).map((_: any, i: number) =>
//         {
//           return {
//             state: SquareState.Letter,
//             answerNo: i === 0 ? 1 : 0,
//             x: i,
//             y: 0,
//             current: false,
//             focus: false,
//             value: ''
//           }
//         });
//       const [word, retRow] = getNextWord(row, Orientation.across);
//       expect(retRow.length).toEqual(0);
//       expect(word?.squares.length).toEqual(15);
//     });

//     it('should have a 5 letter word when there is a single black square', () => {
//       const row = Array.apply(null, Array(15)).map((_: any, i: number) =>
//         {
//           return {
//             state: i == 5 ? SquareState.Block : SquareState.Letter,
//             answerNo: i === 0 ? 1 : 0,
//             x: i,
//             y: 0,
//             current: false,
//             focus: false,
//             value: ''
//           }
//         });

//       const [word, retRow] = getNextWord(row, Orientation.across);
//       expect(retRow.length).toEqual(9);
//       expect(word?.squares.length).toEqual(5);
//     });

//     it('should return a null word when the first letter of the row is black',
//        () => {
//          const fill = matrix2Fill([
//            [[1,0],[0,1],[0,0],
//             [0,0],[0,0],[0,0],
//             [0,0],[0,0],[0,0],
//             [0,0],[0,0],[0,0],
//             [0,0],[0,0],[0,0]]]);
//          const [word, retRow] = getNextWord(fill[0], Orientation.across);
//          expect(retRow.length).toEqual(14);
//          expect(word).toBe(null);
//        });
//   });

//   describe('getWordsRow unit tests', () => {
//     it('should return a single 15 letter word with no black squares', () => {
//       const fill = matrix2Fill([
//         [[0,1],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0]]
//       ]);
//       const words = getWordsRow(fill[0], Orientation.across);
//       expect(words.length).toBe(1);
//     });

//     it('should return two 7 letter words with 1 black squares', () => {
//       const fill = matrix2Fill([
//         [[0,1],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[1,0],[0,2],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0]]
//       ]);
//       const words = getWordsRow(fill[0], Orientation.across);
//       expect(words.length).toBe(2);
//       expect(words[0].squares.length).toBe(7);
//       expect(words[1].squares.length).toBe(7);
//     });

//     it('should return 1 16 letter word with 1 black sqaure at the start', () => {
//       const fill = matrix2Fill([
//         [[1,0],[0,1],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0],
//          [0,0],[0,0],[0,0]]
//       ]);
//       const words = getWordsRow(fill[0], Orientation.across);
//       expect(words.length).toBe(1);
//       expect(words[0].squares.length).toBe(14);
//     });
//   });


//   describe('getWordByPosition unit tests', () => {
//     it('should return 1 across on a blank grid at position 0,0 across', () => {
//       const grid = initGrid(3,3);

//       const wordIdx = getWordByPosition(grid.words, grid.xPos, grid.yPos,
//                                         grid.orientation);
//       const word = grid.words[wordIdx];
//       expect(word.orientation).toBe(Orientation.across);
//       expect(word.wordNo).toBe(1);
//       expect(word.squares[0].x).toBe(0);
//       expect(word.squares[0].y).toBe(0);
//     });

//     it('should return 4 across on a blank grid at position 1,1 across', () => {
//       const grid: Grid = {
//         ...initGrid(3, 3),
//         xPos: 1,
//         yPos: 1,
//       };

//       const wordIdx = getWordByPosition(grid.words, grid.xPos, grid.yPos,
//                                         grid.orientation);
//       const word = grid.words[wordIdx];
//       expect(grid.words.length).toBe(6);
//       expect(word.orientation).toBe(Orientation.across);
//       expect(word.wordNo).toBe(4);
//       expect(word.squares[0].x).toBe(1);
//       expect(word.squares[0].y).toBe(0);
//     });

//     it('should return 2 down on a blank grid at position 1,1 across', () => {
//       const grid: Grid = {
//         ...initGrid(3, 3),
//         orientation: Orientation.down,
//         xPos: 1,
//         yPos: 1,
//       };

//       const wordIdx = getWordByPosition(grid.words, grid.xPos, grid.yPos,
//                                         grid.orientation);
//       const word = grid.words[wordIdx];
//       expect(grid.words.length).toBe(6);
//       expect(word.orientation).toBe(Orientation.down);
//       expect(word.wordNo).toBe(2);
//       expect(word.squares[0].x).toBe(0);
//       expect(word.squares[0].y).toBe(1);
//     });
//   });
// });
