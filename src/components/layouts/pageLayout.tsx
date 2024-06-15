import "./pageLayout.css";

import { ReactElement } from "react";

interface PageLayoutProps {
  children: ReactElement[] | ReactElement,
  openSidebar: boolean,
};

const PageLayout = ({ children, openSidebar }: PageLayoutProps) => {
  return (
    <main className={'page ' + (openSidebar ? "menu-open" : "menu-closed")}>
      {children}
    </main>
  );
};

export default PageLayout;
