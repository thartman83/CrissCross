import { MenuItemProps } from "@/components/ui/menuItem/menuItem";
import { useState } from "react";

export const useMenuItems = ( ) => {

  const [ openNewPuzzle, setOpenNewPuzzle ] = useState<boolean>(false);
  const [ openSettings, setOpenSettings ] = useState<boolean>(false);
  const [ openHelp, setOpenHelp ] = useState<boolean>(false);
  const [ openLoadPuzzle, setOpenLoadPuzzle ] = useState<boolean>(false);

  const menuItems: MenuItemProps[] = [
    {
      text: "New Puzzle",
      onClickHandler: () => { setOpenNewPuzzle(prev => !prev); },
      faIcon: "Plus",
      focused: false,
    },
    {
      text: "Upload Puzzle",
      onClickHandler: () => { setOpenLoadPuzzle(true); },
      faIcon: "Upload",
      focused: false,
    },
    {
      text: "Download Puzzle",
      onClickHandler: () => { },
      faIcon: "Download",
      focused: false,
    },
    {
      text: "Settings",
      onClickHandler: () => { setOpenSettings(prev => !prev); },
      faIcon: "Gear",
      focused: false,
    },
    {
      text: "Help",
      onClickHandler: () => { setOpenHelp(prev => !prev); },
      faIcon: "Question",
      focused: false,
    },
  ];

  return {
    menuItems,
    openNewPuzzle,
    setOpenNewPuzzle,
    openSettings,
    setOpenSettings,
    openHelp,
    setOpenHelp,
    openLoadPuzzle,
    setOpenLoadPuzzle,
  };
};
