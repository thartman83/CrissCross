import Orientation from "@/types/orientation";
import "./cluesLayout.css";
import { useCrossword } from "@/hooks/useCrossword";
import TabPanel, { TabPanelProps } from "@/components/containers/tabPanel/tabPanel";


const CluesLayout = ({labeledBy, id, hidden}: TabPanelProps) => {
  const {crossword} = useCrossword();
  const words = crossword.wordView();
  const clues = crossword.clues;

  const acrosses = words.filter(word => word.orientation === Orientation.across);
  const downs = words.filter(word => word.orientation === Orientation.down);


  return (
    <TabPanel labeledBy={labeledBy} id={id} hidden={hidden}>
      <div className="clues-view">
        <div className="clues-set">
          Acrosses
          <ul className="clues-list">
            {
              acrosses.map(word =>
                <li key={`word-across-${word.wordNo}`}>
                  {word.wordNo + ". " + clues[words.indexOf(word)]}
                </li>)
            }
          </ul>
        </div>
        <div className="clues-set">
          Downs
          <ul className="clues-list">
            {
              downs.map(word =>
                <li key={`word-down-${word.wordNo}`}>
                  {word.wordNo + ". " + clues[words.indexOf(word)]}
                </li>)
            }
          </ul>
        </div>
      </div>
    </TabPanel>
  );
};

export default CluesLayout;
