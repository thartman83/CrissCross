import { crosswordWordView } from "../../hooks/useWords";
import Orientation from "../../types/orientation";
import { availableWords, mostConstrainedWord } from "../autoFillUtilities";

const mockWords = [
  {word: 'FOO', value: 100},
  {word: 'BAR', value: 100},
  {word: 'BAZ', value: 100},
  {word: 'BOB', value: 100},
  {word: 'BOBO', value: 90},
  {word: 'FEZ', value: 100},
  {word: 'OVER', value: 100},
  {word: 'OPED', value: 100},
  {word: 'OPEN', value: 100},
  {word: 'BOOB', value: 100},
  {word: 'BOMB', value: 100},
  {word: 'BOFO', value: 100},
];

describe('autoFillUnitTests unit tests', () => {

  describe('available words unit tests', () => {
    it('should return all X letter words when letter constraints present', () => {
      expect(availableWords(['', '', ''], mockWords).length).toEqual(5);
      expect(availableWords(['', '', '', ''], mockWords).length).toEqual(7);
    });

    it('should return only 3 words for B__', () => {
      expect(availableWords(['B', '', ''], mockWords).length).toEqual(3);
      expect(availableWords(['F', '', ''], mockWords).length).toEqual(2);
    })
  });

  describe('mostConstrainedWord unit tests', () => {
    it(`should return 1 across for the following grid:
_ _ _
_ _ _
_ _ _`,
       () => {
         const words: crosswordWordView = {
           acrosses: {'1': ['','',''], '2': ['','',''], '3': ['','','']},
           downs: {'1': ['','',''], '2': ['','',''], '3': ['','','']},
         };
         const [wordNo, orientation] = mostConstrainedWord(words, mockWords);
         expect(wordNo).toBe('1');
         expect(orientation).toEqual(Orientation.across);
       });

    it(`should return 1 down for the following grid:
B O B .
_ _ _ _
_ _ _ _
. _ _ _`,
       () => {
         const words: crosswordWordView = {
           acrosses: {'1': ['B','O','B'], '4': ['','','',''],
                      '6': ['','','',''], '7': ['','','']},
           downs: {'1': ['B','',''], '2': ['O','','', ''],
                   '3': ['B','','',''], '5': ['','','']  },
         };
         const [wordNo, orientation] = mostConstrainedWord(words, mockWords);
         expect(wordNo).toBe("1");
         expect(orientation).toBe(Orientation.down);
       });

    it(`should return 0 across for a fully constrained grid`, () => {
      const words: crosswordWordView = {
        acrosses: {'1': ['B','O','B'], '4': ['A','R','E'], '5': ['R','B','I']},
        downs: {'1': ['B', 'A', 'R'], '2': ['O', 'R', 'B'], '3': ['B','O','I']}
      }
      const [wordNo, orientation] = mostConstrainedWord(words, mockWords);
      expect(wordNo).toBe('0');
      expect(orientation).toBe(Orientation.across);
    });

    it(`should return 0 across for an invalid grid`, () => {
      const words: crosswordWordView = {
        acrosses: {'1': ['B','O','B'], '4': ['A','R',''], '5': ['R','B','I']},
        downs: {'1': ['B', 'A', 'R'], '2': ['O', 'R', 'B'], '3': ['B','', 'I']}
      }
      const [wordNo, orientation] = mostConstrainedWord(words, mockWords);
      expect(wordNo).toBe('0');
      expect(orientation).toBe(Orientation.across);
    });
  });

});
