import { useEffect, useRef } from "react";
import "./tab.css";

export type TabProps = {
  title: string,
  active: boolean,
  focused: boolean,
  controlId: string,
  onClick: (title: string) => void
};

const Tab = ({title, active, focused, onClick, controlId}: TabProps) => {
  const tabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
     if(focused) {
       tabRef.current?.focus();
     }
  }, [focused]);

  const onClickHandler = () => {
    onClick(controlId);
  };

  return (
    <button className={"tab tab-btn" + (active ? " active" : "")}
            ref={tabRef}
            role="tab"
            aria-selected={active}
            aria-controls={controlId}
            tabIndex={focused ? 0 : -1}
            onClick={onClickHandler}
    >
      <span className="tab-label">{title}</span>
    </button>
  );
};

export default Tab;
