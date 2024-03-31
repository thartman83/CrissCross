import { SetStateAction, Dispatch } from "react";

const TabLink = ({title, active, setActiveTab}:
                 {title: string, active: boolean,
                  setActiveTab: Dispatch<SetStateAction<string>>}) => {

  const onClickHandler = () => {
    setActiveTab(title);
  };

  return (
    <li className={"tab" + (active ? " active" : "")}>
      <a className="tab-link" href="#" onClick={onClickHandler}>{title}</a>
    </li>
  );
};

export default TabLink;
