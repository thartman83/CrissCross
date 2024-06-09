import "./helpKey.css";

export type HelpKeyProps = {
  label: string,
};

const HelpKey = ({label}: HelpKeyProps) => {
  return (
    <span className="help-key">{label}</span>
  );
};

export default HelpKey;
