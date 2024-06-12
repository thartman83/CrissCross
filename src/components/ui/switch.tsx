const Switch = ({label}: {label: string}) => {
  return (
    <>
      <div className="switch-group">
        <input type="checkbox" />
        <span className="switch-slider"/>
      </div>
    </>
  );
};

export default Switch;
