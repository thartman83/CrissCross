import { useCrossword } from "../../context/crosswordContext";

const StatisticsView = () => {
  const {crossword} = useCrossword();
  const words = crossword.wordView();

  const blockCount = crossword.grid.filter(s => s === '.').length;
  const blockPercent = ((blockCount/(crossword.height*crossword.width))
                        *100).toFixed(2);

  const letterCount = (crossword.height*crossword.width) - blockCount;
  const wordCount = words.length;

  const averageWordLen = words.reduce((acc, word) => acc += word.squares.length,0) /
        words.length;

  return (
    <div className="statistics-layout">
      <label>Word Count: {wordCount}</label>
      <label>Average Word Length: {averageWordLen}</label>
      <label>Block Count: {blockCount} ({blockPercent}%)</label>
      <label>Letter Count: {letterCount} </label>
      <label>Word Count: {wordCount}</label>
      <label>Current Position: {crossword.position}</label>
    </div>
  );
};

export default StatisticsView;
