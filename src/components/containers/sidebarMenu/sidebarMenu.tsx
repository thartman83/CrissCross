import "./sidebarMenu.css";
import MenuItem, {MenuItemProps} from "@/components/ui/menuItem/menuItem";

export type SidebarMenuProps = {
  menuItems: MenuItemProps[],
  openSidebar: boolean,
};

const SidebarMenu = ({menuItems, openSidebar}: SidebarMenuProps) => {
  return (
    <div className={"main-menu " + (openSidebar ? "menu-open" : "menu-closed")} >
      <nav>
        <ul>
          {
            menuItems.map((menuItemProps, i) =>
              <MenuItem key={`menuItem-${i}`} {...menuItemProps} />)
          }
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
