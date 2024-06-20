// menuItems.map((props: MenuItemProps, i: number) =>
//              <MenuItem key={`menuItem-${i}`} {...props} />)
import { FocusEvent, ReactElement, useCallback, KeyboardEvent } from "react";
import "./sidebarMenu.css";
import Menu from "../menu/menu";

type OnBlurEvent = FocusEvent<HTMLElement>
type OnKeyDownEvent = KeyboardEvent<HTMLElement>

export type SidebarMenuProps = {
  openSidebar: boolean,
  children: ReactElement[],
  onLeaveHandler: () => void
};

const SidebarMenu = ({openSidebar, children, onLeaveHandler}: SidebarMenuProps) => {

  const asideDiv = useCallback((divElement: HTMLDivElement) => {
    if(divElement && openSidebar) {
      divElement.focus();
    }
  }, [openSidebar]);

  const onBlurHandlerLocal = (e: OnBlurEvent) => {
    if(!e.currentTarget.contains(e.relatedTarget)) {
      onLeaveHandler();
    }
  };

  const KeyDownHandler = (e: OnKeyDownEvent) => {
    const key = e.key;
    if(key === 'Escape') {
      onLeaveHandler();
    }
  };

  return (
    <aside className={"main-menu " + (openSidebar ? "menu-open" : "menu-closed")}
           aria-label="Main Menu" aria-hidden={!openSidebar}
           onBlur={onBlurHandlerLocal} ref={asideDiv} onKeyDown={KeyDownHandler}
    >
      <nav>
        <Menu active={openSidebar}>
          {children}
        </Menu>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
