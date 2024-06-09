import "./tab.css";

export type TabProps = {
  title: string,
  active: boolean,
  controlId?: string,
  onClick: (title: string) => void
};

const TabLink = ({title, active, onClick, controlId}: TabProps) => {
  const onClickHandler = () => {
    onClick(title);
  };

  return (
    <button className={"tab tab-btn" + (active ? " active" : "")}
            role="tab"
            aria-selected={active}
            aria-controls={controlId || ""}
            tabIndex={active ? 0 : -1}
            onClick={onClickHandler}>
      <span className="tab-label">{title}</span>
    </button>
  );
};

export default TabLink;
