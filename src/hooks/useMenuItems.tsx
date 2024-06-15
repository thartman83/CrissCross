import { MenuItemProps } from "@/components/ui/menuItem/menuItem";

export const useMenuItems = () => {
  const menuItems: MenuItemProps[] = [
    {
      text: "New Puzzle",
      onClickHandler: () => {},
      faIcon: "Plus",
    },
    {
      text: "Settings",
      onClickHandler: () => {},
      faIcon: "Gear",
    },
    {
      text: "Help",
      onClickHandler: () => {},
      faIcon: "Question",
    },
  ];

  return {
    menuItems,
  };
};
