import AppSettings from "../types/appSettings";

export const AppActions = {
  updateDimensions: "updateDimensions"
};

const appReducer = (state: AppSettings, action: {type: string, payload: {}}) => {
  switch(action.type) {
  }
  return state;
};

export default appReducer;
