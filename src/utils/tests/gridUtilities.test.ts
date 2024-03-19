import { getNextWord, getWordsRow } from "../gridUtilities";
import {SquareState} from "../../types/square";
import { Orientation, Fill } from "../../types/grid";

type Matrix = Array<Array<[number,number]>>;

// helper
const matrix2Fill = (matrix: Matrix): Fill => {
  return matrix.map((row: Array<[number, number]>, i: number) => {
    return row.map((s: [number, number], j: number) => {
      const [state, wordNo] = s;

      return {
        state: state === 1 ? SquareState.Black : SquareState.Letter,
        answerNo: wordNo,
        x: i,
        y: j,
        current: false,
        focus: false,
        value: ''
      };
    });
  });
};


describe('gridUtilites unit tests', () => {
  describe('getNextWord tests', () => {
    it('should have 1 word for a row with no black squares', () => {
      const row = Array.apply(null, Array(15)).map((_: any, i: number) =>
        {
          return {
            state: SquareState.Letter,
            answerNo: i === 0 ? 1 : 0,
            x: i,
            y: 0,
            current: false,
            focus: false,
            value: ''
          }
        });
      const [word, retRow] = getNextWord(row, Orientation.across);
      expect(retRow.length).toEqual(0);
      expect(word?.squares.length).toEqual(15);
    });

    it('should have a 5 letter word when there is a single black square', () => {
      const row = Array.apply(null, Array(15)).map((_: any, i: number) =>
        {
          return {
            state: i == 5 ? SquareState.Black : SquareState.Letter,
            answerNo: i === 0 ? 1 : 0,
            x: i,
            y: 0,
            current: false,
            focus: false,
            value: ''
          }
        });

      const [word, retRow] = getNextWord(row, Orientation.across);
      expect(retRow.length).toEqual(9);
      expect(word?.squares.length).toEqual(5);
    });

    it('should return a null word when the first letter of the row is black',
       () => {
         const fill = matrix2Fill([
           [[1,0],[0,1],[0,0],
            [0,0],[0,0],[0,0],
            [0,0],[0,0],[0,0],
            [0,0],[0,0],[0,0],
            [0,0],[0,0],[0,0]]]);
         const [word, retRow] = getNextWord(fill[0], Orientation.across);
         expect(retRow.length).toEqual(14);
         expect(word).toBe(null);
       });
  });

  describe('getWordsRow unit tests', () => {
    it('should return a single 15 letter word with no black squares', () => {
      const fill = matrix2Fill([
        [[0,1],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0]]
      ]);
      const words = getWordsRow(fill[0], Orientation.across);
      expect(words.length).toBe(1);
    });

    it('should return two 7 letter words with 1 black squares', () => {
      const fill = matrix2Fill([
        [[0,1],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[1,0],[0,2],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0]]
      ]);
      const words = getWordsRow(fill[0], Orientation.across);
      expect(words.length).toBe(2);
      expect(words[0].squares.length).toBe(7);
      expect(words[1].squares.length).toBe(7);
    });

    it('should return 1 16 letter word with 1 black sqaure at the start', () => {
      const fill = matrix2Fill([
        [[1,0],[0,1],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0],
         [0,0],[0,0],[0,0]]
      ]);
      const words = getWordsRow(fill[0], Orientation.across);
      expect(words.length).toBe(1);
      expect(words[0].squares.length).toBe(14);
    });
  });
});
