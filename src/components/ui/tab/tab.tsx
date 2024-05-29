import "./tab.css";

export type TabProps = {
  title: string,
  active: boolean,
  onClick: (title: string) => void
};

const TabLink = ({title, active, onClick}: TabProps) => {
  const onClickHandler = () => {
    onClick(title);
  };

  return (
    <li className={"tab" + (active ? " active" : "")}>
      <button className="tab-btn" type="button" role="tab"
              onClick={onClickHandler}>
        <span className="tab-label">{title}</span>
      </button>
      {/* <a className="tab-link" href="#" onClick={onClickHandler}>{title}</a> */}
    </li>
  );
};

export default TabLink;
