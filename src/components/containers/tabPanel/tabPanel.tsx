import { ReactElement } from "react";
import "./tabPanel.css";

export type TabPanelProps = {
  labeledBy: string,
  id: string,
  hidden: boolean,
  children?: ReactElement | ReactElement[],
};

const TabPanel = ({id, hidden, labeledBy, children}: TabPanelProps) => {
  return (
    <div id={id} role="tabpanel" hidden={hidden} aria-labelledby={labeledBy}
         tabIndex={0} className="tab-panel">
      {children}
    </div>
  );
};

export default TabPanel;
