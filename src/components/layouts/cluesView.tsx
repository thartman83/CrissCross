import useWords from "../../hooks/useWords";
import "./cluesView.css";

const CluesView = () => {
  const words = useWords();

  const acrossList = Object.keys(words.acrosses).map((num: string) => {
    return <li key={`word-across-${num}`}>{num + ". " + words.acrosses[num]}</li>;
  });

  const downsList = Object.keys(words.downs).map((num: string) => {
    return <li key={`word-downs-${num}`}>{num + ". " + words.downs[num]}</li>;
  });

  return (
    <>
      <div className="clues-view">
        <div className="clues-set">
          Acrosses
          <ul className="clues-list">
            { acrossList }
          </ul>
        </div>
        <div className="clues-set">
          Downs
          <ul className="clues-list">
            { downsList }
          </ul>
        </div>
      </div>
    </>
  );
};

export default CluesView;
