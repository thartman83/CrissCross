import { createContext, useContext, ReactNode, useReducer } from "react";
import AppSettings, { GridSymmetry } from "../types/appSettings";
import appReducer, { AppActions } from "./applicationReducer";

const defaultGridSize = 15;

export type AppContextType = {
  appSettings: AppSettings,
  updateDimensions: (height: number, width: number) => void
};

const AppContext = createContext<AppContextType|undefined>(undefined);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if(!ctx) {
    throw new Error(
      "useApp must be used with the AppContextProvider");
  }
  return ctx;
};

const defaultAppSettings = () => {
  return {
    height: defaultGridSize,
    width: defaultGridSize,
    gridSymmetry: GridSymmetry.Rotational,
  };
};

const AppContextProvider = ({children}: {children: ReactNode}) => {
  const initState: AppSettings = defaultAppSettings();
  const [appState, dispatch] = useReducer(appReducer, initState);

  const updateDimensions = (height: number, width: number) => {
    dispatch({type: AppActions.updateDimensions, payload: {
      height: height,
      width: width
    }});
  };

  return (
    <AppContext.Provider value={{
      appSettings: appState,
      updateDimensions: updateDimensions
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
