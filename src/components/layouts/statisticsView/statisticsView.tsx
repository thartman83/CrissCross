import "./statisticsView.css";
import TabPanel, { TabPanelProps } from "@/components/containers/tabPanel/tabPanel";
import { useCrossword } from "@/hooks/useCrossword";

const StatisticsView = ({labeledBy, id, hidden}: TabPanelProps) => {
  const {crossword} = useCrossword();
  const words = crossword.wordView();

  const blockCount = crossword.grid.filter(s => s === '.').length;
  const blockPercent = ((blockCount/(crossword.height*crossword.width))
                        *100).toFixed(2);

  const nonBlockCount = (crossword.height*crossword.width) - blockCount;
  const wordCount = words.length;

  const averageWordLen =
        (words.reduce((acc, word) => acc += word.squares.length,0) /
         words.length).toFixed(2);

  const letterCount = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter: string) => {
    return <label key={`letter-count-${letter}`}>
             {letter}: {crossword.grid.filter(s => s === letter).length}
           </label>;
  });

  const maxDim = Math.max(crossword.width, crossword.height);
  const wordsCounts = [...Array(maxDim).keys()].map((num) =>
    <label key={`word-count-${num+1}`}>
      {num+1}: {words.filter(word => word.squares.length === num+1).length}
    </label>
  );

  return (
    <TabPanel labeledBy={labeledBy} id={id} hidden={hidden}>
      <h4 className="stats-header">General</h4>
      <div className="statistics-layout">
        <label>Word Count: {wordCount}</label>
        <label>Average Word Length: {averageWordLen}</label>
        <label>Block Count: {blockCount} ({blockPercent}%)</label>
        <label>Letter Count: {nonBlockCount} </label>
        <label>Word Count: {wordCount}</label>
        <label>Current Position: {crossword.position}</label>
      </div>
      <h4 className="stats-header">Letter Counts</h4>
      <div className="stats-grid">{letterCount}</div>

      <h4 className="stats-header">Word Counts</h4>
      <div className="stats-grid">{wordsCounts}</div>
    </TabPanel>
  );
};

export default StatisticsView;
