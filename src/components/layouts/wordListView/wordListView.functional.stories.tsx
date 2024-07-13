import { LoremIpsum } from 'lorem-ipsum';
import { Meta, StoryObj } from '@storybook/react';
import WordListView, {WordListViewProps} from './wordListView';
import { WordListWord } from '@/context/wordListContext';
import { expect, fn, userEvent, within } from '@storybook/test';

const lorem = new LoremIpsum();
const mockWordSelectHandler = fn();

const newWord = (word: string, value: number): WordListWord => {
  return {
    word: word,
    value: value,
  };
};

const loremWordList = lorem.generateWords(100).split(' ').map(
  (s) => newWord(s.toUpperCase(), 100) );

const staticWordList = [
    { word:"ABDOMINALS", value: 21},
    { word:"ABDOMINALSOUNDS", value: 50},
    { word:"ABDOMINALTHRUST", value: 50},
    { word:"ABDOMINALTHRUSTS", value: 50},
    { word:"ABDOMINALWALL", value: 22},
    { word:"ABDOMINALWALLS", value: 50},
    { word:"ABDOMINALXRAY", value: 50},
    { word:"ABDOMINOCENTESIS", value: 5},
    { word:"ABDOMINOPLASTY", value: 26},
    { word:"ABDOMINOUS", value: 25},
    { word:"ABDOMINOUSNESS", value: 20},
    { word:"ABDOMINOVESICAL", value: 5},
    { word:"ABDUCE", value: 30},
    { word:"ABDUCED", value: 20},
    { word:"ABDUCENS", value: 20},
    { word:"ABDUCENSMUSCLE", value: 5},
    { word:"ABDUCENSNERVE", value: 40},
    { word:"ABDUCENT", value: 30},
    { word:"ABDUCENTES", value: 20},
    { word:"ABDUCENTNERVE", value: 40},
    { word:"ABDUCES", value: 20},
    { word:"ABDUCING", value: 20},
    { word:"ABDUCT", value: 90},
    { word:"ABDUCTED", value: 80},
    { word:"ABDUCTEE", value: 30},
    { word:"ABDUCTEES", value: 30},
    { word:"ABDUCTING", value: 50},
    { word:"ABDUCTION", value: 90},
    { word:"ABDUCTIONFROMTHESERAGLIO", value: 40},
    { word:"ABDUCTIONS", value: 50},
    { word:"ABDUCTOR", value: 30},
    { word:"ABDUCTORES", value: 20},
    { word:"ABDUCTORMUSCLE", value: 40},
    { word:"ABDUCTORMUSCLES", value: 53},
    { word:"ABDUCTORS", value: 30},
    { word:"ABDUCTS", value: 80},
    { word:"ABDUL", value: 80},
    { word:"ABDULABULBULAMIR", value: 49},
    { word:"ABDULAZIZ", value: 30},
    { word:"ABDULAZIZALSAUD", value: 50},
    { word:"ABDULAZIZIBNSAUD", value: 50},
    { word:"ABDULHAMIDII", value: 55},
    { word:"ABDULJABBAR", value: 80},
    { word:"ABDULLAH", value: 50},
  ];

const meta: Meta<WordListViewProps> = {
  title: "Layouts/Word List View/Functional Tests",
  component: WordListView,
  render: (args) => (
    <div style={{ height: "75vh", width: "95%"}}>
      <WordListView {...args} />
    </div>
  ),
};

export default meta;

type WordListViewStory = StoryObj<WordListViewProps>

export const SelectWordTests: WordListViewStory = {
  args: {
    hidden: false,
    labeledBy: "",
    id: "wordListView",
    wordList: loremWordList,
    wordSelectedHandler: mockWordSelectHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const wordBtns = await canvas.findAllByRole('button');

    await step('When a word is clicked it should fire the wordSelectHandler with the selected word', async () => {
      const randomWord = wordBtns[Math.floor(Math.random() * wordBtns.length)];
      const wordParts = randomWord.innerText.split('\n');

      await userEvent.click(randomWord);

      expect(mockWordSelectHandler).toBeCalledTimes(1);
      expect(mockWordSelectHandler.mock.lastCall[0]).toMatchObject(
        { word: wordParts[0].toUpperCase(), value: Number(wordParts[1]) });
    });

    mockWordSelectHandler.mockClear();

    await step('Using the keyboard should result in the same thing', async () => {
      const randomWord = wordBtns[Math.floor(Math.random() * wordBtns.length)];
      const wordParts = randomWord.innerText.split('\n');

      randomWord.focus();
      await userEvent.keyboard('[Enter]');

      expect(mockWordSelectHandler).toBeCalledTimes(1);
      expect(mockWordSelectHandler.mock.lastCall[0]).toMatchObject(
        { word: wordParts[0].toUpperCase(), value: Number(wordParts[1]) });
    });
  },
};

export const FilterWordsTest: WordListViewStory = {
  args: {
    hidden: false,
    labeledBy: "",
    id: "wordListView",
    wordList: staticWordList,
    wordSelectedHandler: mockWordSelectHandler,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('textbox');
    await step('The search textbox should filter the results on input', async () => {
      const searchResults = canvas.getByRole('status');
      searchInput.focus();
      await userEvent.keyboard('DUC');
      expect(searchResults.innerText).toEqual('24 Words Available');

    });

    await step('Removing the search text data should unfilter the list', async () => {
      const searchResults = canvas.getByRole('status');
      await userEvent.clear(searchInput);
      expect(searchResults.innerText).toEqual('44 Words Available');

    });
  },
};
