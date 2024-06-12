import "./searchInput.css";
import { ChangeEvent } from "react";

type ChangeSearchEvent = ChangeEvent<HTMLInputElement>;

const SearchInput = ({onChangeHandler}:
                     {onChangeHandler: (event: ChangeSearchEvent) => void}) => {
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
