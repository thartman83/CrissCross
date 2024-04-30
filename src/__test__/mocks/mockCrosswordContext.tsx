import { ReactNode, createContext, KeyboardEvent } from 'react';
import { CrosswordContextType } from '@/context/crosswordContext';
import Crossword, { GridView, Word, WordView } from '@/types/crossword';
import { vi } from 'vitest';

const MockCrosswordContext =
      createContext<CrosswordContextType|undefined>(undefined);

type SquareKeyDownEvent = KeyboardEvent<HTMLInputElement>;

const mockOnKeyDown = (_: SquareKeyDownEvent) => {};
export const OnKeyDownSpy = vi.fn(mockOnKeyDown);

const MockCrosswordContextProvider = ({children}: {children: ReactNode}) => {

  const blankCrossword = (): Crossword => {
    return {
      title: '',
      author: '',
      copyright: '',
      notes: '',
      position: 0,
      orientation: 0,
      height: 15,
      width: 15,
      grid: Array(15*15).fill(''),
      gridView: ():GridView => {return [];},
      wordView: ():WordView => {return [];},
      currentWord: ():Word => {return { wordNo: 0, indicies: [],
                                        squares: [], orientation: 0};},
    };
  };

  return (
    <MockCrosswordContext.Provider value={{
      crossword: blankCrossword(),
      onKeyDown: mockOnKeyDown,
      onClick: () => {},
      onNew: () => {},
      updateMetadata: () => {},
      updateCurrentWord: () => {},
      undo: () => {}
    }}>
      {children}
    </MockCrosswordContext.Provider>
  );
};

export default MockCrosswordContextProvider;
