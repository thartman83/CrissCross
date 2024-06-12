import "./mainLayout.css";
import { ReactElement } from "react";

interface MainLayoutProps {
  children: ReactElement[],
};

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div className="main">
      {children}
    </div>
  );
};

export default MainLayout;
