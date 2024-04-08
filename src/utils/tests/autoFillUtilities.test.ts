import {availableWords, constrainedWords} from "../autoFillUtilities";
import { crosswordWordView } from "../../hooks/useWords";

const mockWords = [
  {word: 'FOO', value: 100},
  {word: 'BAR', value: 100},
  {word: 'BAZ', value: 100},
  {word: 'BOB', value: 100},
  {word: 'BOBO', value: 90},
  {word: 'FEZ', value: 100}
];

jest.mock('../../context/wordListContext', () => ({
  useWordList: () => ({wordList: mockWords}),
}));

describe('autoFillUnitTests unit tests', () => {
  describe('available words unit tests', () => {
    it('should return all X letter words when letter constraints present', () => {
      expect(availableWords(['', '', '']).length).toEqual(5);
      expect(availableWords(['', '', '', '']).length).toEqual(1);
    });

    it('should return only 3 words for B__', () => {
      expect(availableWords(['B', '', '']).length).toEqual(3);
      expect(availableWords(['F', '', '']).length).toEqual(2);
    })
  });

  describe('constrainedWords unit tests', () => {
    it(`should return 1 across for a grid:
B_R
___
___`,
       () => {
         const wordView: crosswordWordView = {
           acrosses: {'1': ['B', '', 'R'], '2': ['', '', ''], '3': ['', '', '']} ,
           downs: {'1': ['B', '', ''], '2': ['','',''], '3': ['R', '', '']}
         };

         expect(constrainedWords(wordView)).toBe(expected)
       });
  });
});
