import Crossword from "./crossword";

type CrosswordCommand = {
  do: (crossword: Crossword) => Crossword;
  undo: (crossword: Crossword) => Crossword;
};

export default CrosswordCommand;
