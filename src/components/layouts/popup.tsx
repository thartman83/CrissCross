import "./popup.css";
import { ReactNode } from "react";

const Popup = ({children}: {children: ReactNode}) => {
  return <div className="popup-layout">
           {children}
         </div>;
};

export default Popup;
