import { createContext, useContext, ReactNode, useReducer, useState } from "react";
import AppSettings, { GridSymmetry } from "../types/appSettings";
import appReducer, { AppActions } from "./applicationReducer";

const defaultGridSize = 15;

export type AppContextType = {
  appSettings: AppSettings,
  updateDimensions: (height: number, width: number) => void
  openHelpModal: boolean,
  setOpenHelpModal: (openHelpModal: boolean) => void,
  openNewModal: boolean,
  setOpenNewModal: (openNewModal: boolean) => void,
  openConfirmModal: boolean,
  setOpenConfirmModal: (openConfirmModal: boolean) => void,

  openMainMenu: boolean,
  setOpenMainMenu: (openMainMenu: boolean) => void,
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
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [openMainMenu, setOpenMainMenu] = useState(false);

  const updateDimensions = (height: number, width: number) => {
    dispatch({type: AppActions.updateDimensions, payload: {
      height: height,
      width: width
    }});
  };

  return (
    <AppContext.Provider value={{
      appSettings: appState,
      updateDimensions: updateDimensions,
      openHelpModal: openHelpModal,
      setOpenHelpModal: setOpenHelpModal,
      openNewModal: openNewModal,
      setOpenNewModal: setOpenNewModal,
      openConfirmModal: openConfirmModal,
      setOpenConfirmModal: setOpenConfirmModal,
      openMainMenu: openMainMenu,
      setOpenMainMenu: setOpenMainMenu,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
