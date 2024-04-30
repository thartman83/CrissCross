import { useContext } from 'react';
import {CrosswordContext} from '@/context/crosswordContext';

export const useCrossword = () => {
  const context = useContext(CrosswordContext);
  if(!context) {
    throw new Error(
      "useCrossword must be used within a CrosswordContextProvider"
    );
  }
  return context;
};
