import { KeyboardEvent, MouseEvent, ChangeEvent, useRef,
         useEffect /*, useState */ } from "react";
import { useCrossword } from "../../context/crosswordContext";
//import Popup from "../layouts/popup";

type SquareArgs = {
  value: string,
  pos: number,
  focus: boolean,
  highlight: boolean,
  wordNo: number,
};

type SquareKeyDownEvent = KeyboardEvent<HTMLInputElement>;
type SquareChangeEvent = ChangeEvent<HTMLInputElement>;
type SquareMouseEvent = MouseEvent<HTMLInputElement>;

const SquareInput = ({value, pos, focus, highlight, wordNo}: SquareArgs) => {
  const inputEl = useRef<HTMLInputElement>(null);
//  const [isHovering, setIsHovering] = useState<Boolean>(false);

  useEffect(() => {
    if(focus) {
      inputEl.current?.focus();
    }
  });

  const { onKeyDown, onClick } = useCrossword();

  // trap key events and fire them off to the crossword context for
  // processing
  const onKeyDownHandler = (e: SquareKeyDownEvent) => {
    onKeyDown(e);
    e.preventDefault();
  };

  // by default we don't want to do anything if we don't intend to
  // process it
  const onChangeHandler = (e: SquareChangeEvent) => {
    e.preventDefault();
  };

  // set the current position when an input is click
  const onClickHandler = (e: SquareMouseEvent) => {
    onClick(pos,e);
    e.preventDefault();
  };

  // On double click switch the orientation of the cursor
  const onDoubleClickHandler = (e: SquareMouseEvent) => {
    onClick(pos,e);
    e.preventDefault();
  };

  // const onMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const onMouseLeave = () => {
  //   setIsHovering(false);
  // };

  return (
    <div className="grid-square"
         /* onMouseEnter={onMouseEnter} */
         /* onMouseLeave={onMouseLeave} */
    >
      <label data-answerno={wordNo === 0 ? "" : wordNo} />
      <input value={value} type="text"
             className="grid-square-input"
             readOnly={value === '.'}
             data-pos={pos}
             maxLength={1}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             onClick={onClickHandler}
             onDoubleClick={onDoubleClickHandler}
             data-highlight={highlight}
             ref={inputEl}
      />
      {/* isHovering && (<Popup/>) */}
    </div>
  );
};

export default SquareInput;
