import Orientation from "@/types/orientation";
import "./cluesLayout.css";
import { useCrossword } from "@/hooks/useCrossword";
import TabPanel, { TabPanelProps } from "@/components/containers/tabPanel/tabPanel";
import ClueInput from "@/components/ui/clueInput/clueInput";
import { useEffect, useRef } from "react";

const CluesLayout = ({labeledBy, id, hidden}: TabPanelProps) => {
  const {crossword, focusWord} = useCrossword();
  const words = crossword.wordView();
  const clues = crossword.clues;

  const acrosses = words.filter(word => word.orientation === Orientation.across);
  const downs = words.filter(word => word.orientation === Orientation.down);
  const currentWord = crossword.currentWord();

  const clueRefs = clues.map( _ => useRef<HTMLLIElement>(null) );

  const changeHandler = () => {

  };

  const focusHandler = (wordNo: number, orientation: Orientation) => {
    focusWord(wordNo, orientation);
  };

  useEffect(() => {
    const idx = words.findIndex(e => e.orientation === currentWord.orientation &&
                                e.wordNo === currentWord.wordNo);

    if(idx !== -1 && clueRefs[idx])
      clueRefs[idx].current?.scrollIntoView();
  }, [currentWord]);

  return (
    <TabPanel labeledBy={labeledBy} id={id} hidden={hidden}>
      <div className="clues-view">
        <div className="clues-set">
          <div className="clues-set-label">
            <label>Acrosses</label>
          </div>
          <ul className="clues-list">
            {
              acrosses.map(word =>
                <li key={`word-across-${word.wordNo}`}
                    ref={clueRefs[words.indexOf(word)]}
                >
                  <ClueInput clue={clues[words.indexOf(word)]}
                             clueNo={word.wordNo}
                             orientation={Orientation.across}
                             changeHandler={changeHandler}
                             focusHandler={focusHandler}
                             highlight={currentWord.wordNo === word.wordNo &&
                                   currentWord.orientation == word.orientation}/>
                </li>)
            }
          </ul>
        </div>
        <div className="clues-set">
          <div className="clues-set-label">
            <label>Downs</label>
          </div>
          <ul className="clues-list">
            {
              downs.map(word =>
                <li key={`word-down-${word.wordNo}`}
                    ref={clueRefs[words.indexOf(word)]}
                >
                  <ClueInput clue={clues[words.indexOf(word)]}
                             clueNo={word.wordNo}
                             orientation={Orientation.down}
                             changeHandler={changeHandler}
                             focusHandler={focusHandler}
                             highlight={currentWord.wordNo === word.wordNo &&
                                   currentWord.orientation == word.orientation}/>

                </li>)
            }
          </ul>
        </div>
      </div>
    </TabPanel>
  );
};

export default CluesLayout;
