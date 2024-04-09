import Crossword from "../../types/crossword";
import Orientation from "../../types/orientation";
import { getPositionByWordNo, insertWord } from "../gridUtilities";

const blank4x4Crossword: Crossword = {
    title: "",
    author: "",
    position: {
      x: 0,
      y: 0
    },
    orientation: Orientation.across,
    height: 4,
    width: 4,
    grid: [['', '', '', ''],
           ['', '', '', ''],
           ['', '', '', ''],
           ['', '', '', ''],]
  };

describe('Grid Utilities unit tests', () => {

  describe('getPositionByWordNo unit tests', () => {
    it(`SHOULD return position 0,0 for 1 on a blank grid`, () => {
      const {x,y} = getPositionByWordNo(blank4x4Crossword, '1');
      expect(x).toEqual(0);
      expect(y).toEqual(0);
    });

    it(`SHOULD return position 0,1 for 2 on a blank grid`, () => {
      const {x,y} = getPositionByWordNo(blank4x4Crossword, '2');
      expect(x).toBe(0);
      expect(y).toBe(1);
    });

  });

  describe('insertWord unit tests', () => {
    it(`WHEN crossword grid is blank
        WHEN 1 across is inserted
        SHOULD return grid:
        BARB
        ____
        ____
        ____`, () => {
          const newGrid = insertWord(blank4x4Crossword, '1', Orientation.across,
                                     'BARB');
          'BARB'.split('').forEach((c: string, i: number) => {
            expect(newGrid[0][i]).toEqual(c);
          });
        });
    it(`WHEN crossword grid is blank
        WHEN 2 DOWN is inserted
        SHOULD return grid
        _B__
        _A__
        _R__
        _B__`, () => {
          const newGrid = insertWord(blank4x4Crossword, '2', Orientation.down,
                                     'BARB');
          'BARB'.split('').forEach((c: string, i: number) => {
            expect(newGrid[i][1]).toEqual(c);
          });
        });
  });
});
