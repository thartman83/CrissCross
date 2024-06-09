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
    <li className={"tab" + (active ? " active" : "")}>
      <button className="tab-btn" type="button" role="tab"
              aria-selected={active}
              aria-controls={controlId || ""}
              onClick={onClickHandler}>
        <span className="tab-label">{title}</span>
      </button>
    </li>
  );
};

export default TabLink;
