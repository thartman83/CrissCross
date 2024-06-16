import { FocusEvent, useCallback } from "react";
import "./sidebarMenu.css";
import MenuItem, {MenuItemProps} from "@/components/ui/menuItem/menuItem";

type OnBlurEvent = FocusEvent<HTMLElement>

export type SidebarMenuProps = {
  menuItems: MenuItemProps[],
  openSidebar: boolean,
  onLeaveHandler: () => void
};

const SidebarMenu = ({menuItems, openSidebar, onLeaveHandler}: SidebarMenuProps) => {
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
  
  return (
    <aside className={"main-menu " + (openSidebar ? "menu-open" : "menu-closed")}
           aria-label="Main Menu" aria-hidden={!openSidebar}
           onBlur={onBlurHandlerLocal} tabIndex={openSidebar ? 0 : -1}
           ref={asideDiv}
    >
      <nav>
        <ul>
          {
            menuItems.map((menuItemProps, i) =>
              <MenuItem key={`menuItem-${i}`} {...menuItemProps} />)
          }
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
