import { Meta, StoryObj } from '@storybook/react';
import WordListView, {WordListViewProps} from './wordListView';
import { LoremIpsum } from 'lorem-ipsum';
import { WordListWord } from '@/context/wordListContext';

const lorem = new LoremIpsum();

const newWord = (word: string, value: number): WordListWord => {
  return {
    word: word,
    value: value,
  };
};

const meta: Meta<WordListViewProps> = {
  title: "Layouts/Word List View/Examples",
  component: WordListView,
  render: (args) => (
    <div style={{ height: "75vh", width: "95%"}}>
      <WordListView {...args} />
    </div>
  ),
};

export default meta;

type WordListViewStory = StoryObj<WordListViewProps>

export const ExampleWordListView: WordListViewStory = {
  args: {
    hidden: false,
    labeledBy: "",
    id: "wordListView",
    wordList: lorem.generateWords(100).split(' ').map(
      (s) => newWord(s, 100) ),
    wordSelectedHandler: () => {},
  },
};
