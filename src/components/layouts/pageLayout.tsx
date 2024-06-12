import "./pageLayout.css";

import { ReactElement } from "react";

interface PageLayoutProps {
  children: ReactElement[],
  openSidebar: boolean,
};

const PageLayout = ({ children, openSidebar }: PageLayoutProps) => {
  return (
    <div className={'page ' + (openSidebar ? "menu-open" : "menu-closed")}>
      {children}
    </div>
  );
};

export default PageLayout;
