import Crossword from "../types/crossword";
import CrosswordCommand from "../types/crosswordCommand";

const metadataNames = [
  'TITLE',
  'AUTHOR',
  'COPYRIGHT',
  'NOTES'
];

const UpdateMetadataCommand = (name: string, value: string): CrosswordCommand => {
  return {
    do: (crossword: Crossword): Crossword => {

      if(!metadataNames.includes(name.toUpperCase()))
        throw `Unknown metadata ${name}`;

      switch(name.toUpperCase()) {
        case 'TITLE':
          return {
            ...crossword,
            position: -1,
            title: value,
          }
        case 'AUTHOR':
          return {
            ...crossword,
            position: -1,
            author: value,
          }
        case 'COPYRIGHT':
          return {
            ...crossword,
            position: -1,
            copyright: value,
          }
        case 'NOTES':
          return {
            ...crossword,
            position: -1,
            notes: value,
          }
      }

      return crossword;
    },
    undo: (crossword: Crossword): Crossword => {
      return crossword;
    }
  }
};

export default UpdateMetadataCommand;
