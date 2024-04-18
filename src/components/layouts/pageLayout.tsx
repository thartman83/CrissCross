import "./pageLayout.css";

import { ReactElement } from "react";
import { useApp } from "../../context/applicationContext";

interface PageLayoutProps {
  children: ReactElement[],
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const {openMainMenu} = useApp();

  return (
    <div className={'page ' + (openMainMenu ? "menu-open" : "menu-closed")}>
      {children}
    </div>
  );
};

export default PageLayout;
