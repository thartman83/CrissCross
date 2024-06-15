import { useState } from "react";

export const useOpenMenu = (startState: boolean) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(startState);

  // const closeSideBar = () => {

  // };

  // useEffect(() => {
  //   if(isOpenMenu) {

  //   }

  //   return function cleanup() {
  //     window.removeEventListener('click', closeSideBar);
  //   };
  // }, [isOpenMenu]);

  const toggleOpenMenu = () => {
    setIsOpenMenu(e => !e);
  };

  const closeOpenMenu = () => {
    setIsOpenMenu(false);
  };

  return {
    isOpenMenu,
    toggleOpenMenu,
    closeOpenMenu,
  };
};
