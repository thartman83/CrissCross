import "./headerLayout.css";
import { ReactElement } from "react";

interface HeaderLayoutProps {
  children: ReactElement[],
};

const HeaderLayout = ({children}: HeaderLayoutProps) => {
  return (
    <div className="header">
      {children}
    </div>
  );
};

export default HeaderLayout;
