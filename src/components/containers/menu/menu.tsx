import { KeyboardEvent, ReactElement, cloneElement, useState } from "react";
import "./menu.css";

type MenuKeyboardEvent = KeyboardEvent<HTMLUListElement>

export type MenuProps = {
  active: boolean,
  children: ReactElement[],
};

const Menu = ({active, children}: MenuProps) => {
  const [ currentElement, setCurrentElement ] = useState<number>(0);

  const keyDownHandler = (e: MenuKeyboardEvent) => {
    const key = e.key;
    switch(key) {
    case 'ArrowDown':
      if(currentElement === (children.length - 1))
        setCurrentElement(0);
      else
        setCurrentElement((prev) => prev + 1);
      break;
    case 'ArrowUp':
      if(currentElement == 0)
        setCurrentElement(children.length - 1);
      else
        setCurrentElement((prev) => prev - 1);
    };
  };

  return (
    <ul role="menu" onKeyDown={keyDownHandler}>
      {
        children.map((child, i) => {
          const focus = active && i === currentElement;
          return cloneElement(child, {focused: focus});
        })
      }
    </ul>
  );
};

export default Menu;
