import './square.css';
import classNames from 'classnames';

export type SquareProps = {
  value: string,
  wordNo?: number,
  squareNo?: number,
  focused?: boolean,
  currentWord?: boolean,
};

const Square = (props: SquareProps) => {
  const classes = classNames('grid-square',
                             {'focused': props.focused},
                             {'current-word': props.currentWord},
                             {'block': props.value === '.'});

  return (
    <div className={classes} data-squareno={props?.squareNo}>
      <div className='grid-square-alt' data-squareno={props?.squareNo} />
      <div className='grid-square-block'/>
      <label className='grid-square-wordno' data-squareno={props?.squareNo}>
        {props.wordNo}
      </label>
      <label className='grid-square-value' data-squareno={props?.squareNo}>
        {props.value}
      </label>
    </div>
  );
};

export default Square;
