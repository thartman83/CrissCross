import { useReducer } from 'react';
import './App.css';
import GridLayout from './components/layouts/gridLayout';
import GridSummary from './components/ui/gridSummary';
import gridReducer from './state/gridContext';
import { initGrid } from './utils/gridUtilities.ts';
import ClueLayout from './components/layouts/clueLayout.tsx';

const defaultGridSize = 15;

function App() {
  const [grid, dispatch] = useReducer(gridReducer, initGrid(defaultGridSize,
                                                            defaultGridSize));
  return (
    <>
      <div className='header'>CrissCross
        <div className='header-icons'>
          <button>&#10227;</button>
          <button>?</button>
        </div>
      </div>
      <div className='main'>
        <GridLayout grid={grid} dispatch={dispatch} />
        <GridSummary grid={grid} />
      </div>
      <div className='clues'>
        <ClueLayout grid={grid} />
      </div>
    </>
  );
}

export default App;
