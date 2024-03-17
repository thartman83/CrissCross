import { useReducer } from 'react';
import './App.css';
import GridLayout from './components/layouts/gridLayout';
import gridReducer from './state/gridContext';
import {initGrid} from './utils/gridUtilities';

const defaultGridSize = 15;

function App() {
  const [grid, dispatch] = useReducer(gridReducer, initGrid(defaultGridSize,
                                                            defaultGridSize));
  return (
    <>
      <GridLayout grid={grid} dispatch={dispatch} />
    </>
  );
}

export default App;
