import "./searchInput.css";

const SearchInput = ({onChangeHandler}) => {

  return (
    <>
      <div className="input-group">
        <input type="string" className="input-search"
               placeholder="Search word list"
               onChange={onChangeHandler} />
        <span className="icon-left"/>
      </div>
    </>
  );
};

export default SearchInput;
