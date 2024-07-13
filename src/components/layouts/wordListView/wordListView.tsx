import { useEffect, useRef, useState } from "react";
import { WordList, WordListWord } from "@/context/wordListContext";
import "./wordListView.css";
import TabPanel, { TabPanelProps } from "@/components/containers/tabPanel/tabPanel";
import { ViewportList } from "react-viewport-list";
import TextInput from "@/components/ui/textInput/textInput";
import WordButton from "@/components/ui/wordButton/wordButton";

const defaultRenderCount = 15;

export type WordListViewProps = TabPanelProps & {
  wordList: WordList,
  wordSelectedHandler: (w: WordListWord) => void,
  initialRenderCount?: number,
};

const WordListView = ({ hidden, id, labeledBy, wordList, wordSelectedHandler, initialRenderCount = defaultRenderCount}: WordListViewProps) => {
  const wordListRef = useRef(null);
  const [ curFilter, setCurFilter ] = useState<string>("");
  const [ filteredWords, setFilteredWords ] = useState<WordList>(wordList);

  const filterSearchHandler = (filterStr: string) => {
    setCurFilter(filterStr);
  };

  useEffect(() => {
    if(curFilter === "")
      setFilteredWords(wordList);
    else
      setFilteredWords(wordList.filter(
        w => w.word.toLowerCase().includes(curFilter.toLowerCase())));
  }, [wordList, curFilter]);

  return (
    <TabPanel id={id} labeledBy={labeledBy} hidden={hidden} >
      <div className="wordlist-view">
      <TextInput placeholder="Filter Available Words"
                 changeHandler={filterSearchHandler}
                 rightIcon={String.fromCodePoint(0x26B2)} rightIconRotate={-45}
                 />
        <div className="wordlist-viewport" ref={wordListRef}>
          <ViewportList viewportRef={wordListRef} items={filteredWords}
                        initialPrerender={initialRenderCount}>
          {
            (word, idx) => (
              <WordButton word={word} key={`${idx}-word`}
                          selectHandler={wordSelectedHandler} />
            )
          }
          </ViewportList>
        </div>
        <div className="wordlist-available">
          <span role="status">
          { filteredWords.length + " Words Available"}
          </span>
        </div>
      </div>
    </TabPanel>
  );
};

export default WordListView;
