import { useCrossword } from "../../context/crosswordContext";
import useWords from "../../hooks/useWords";

const StatisticsView = () => {
  const {crossword} = useCrossword();
  const {acrosses, downs} = useWords();

  const squareCount: {[key: string]: number} = {};

  // convert the grid into a dictionary of the number of instances of
  // each character in the grid
  crossword.grid.forEach((row) => row.forEach(
    (s) => s in squareCount ? squareCount[s]++ : squareCount[s] = 1 ));

  const blockCount = squareCount['.'];
  const blockPercent = ((blockCount/(crossword.height*crossword.width))
                        *100).toFixed(2);

  const letterCount = (crossword.height*crossword.width) - blockCount;
  const wordCount = Object.keys(acrosses).length + Object.keys(downs).length;

  const averageWordLen =
        ((Object.keys(acrosses).map((key) => {
          return acrosses[key].length;
        }).reduce((total,val) => total + val) +
        Object.keys(downs).map((key) => {
          return downs[key].length;
        }).reduce((total,val) => total + val)) / wordCount).toFixed(2);

  return (
    <div className="statistics-layout">
      <label>Word Count: {wordCount}</label>
      <label>Average Word Length: {averageWordLen}</label>
      <label>Block Count: {blockCount} ({blockPercent}%)</label>
      <label>Letter Count: {letterCount} </label>
    </div>
  );
};

export default StatisticsView;
