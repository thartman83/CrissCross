import { FocusEvent, useEffect, useRef } from "react";
import "./sidebarMenu.css";
import MenuItem, {MenuItemProps} from "@/components/ui/menuItem/menuItem";

type OnBlurEvent = FocusEvent<HTMLElement>

export type SidebarMenuProps = {
  menuItems: MenuItemProps[],
  openSidebar: boolean,
  onLeaveHandler: () => void
};

const SidebarMenu = ({menuItems, openSidebar, onLeaveHandler}: SidebarMenuProps) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if(asideRef.current && openSidebar)
      asideRef.current.focus();
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
           ref={asideRef}
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
