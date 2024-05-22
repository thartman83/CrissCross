import "./mainMenu.css";
import { useApp } from '../../context/applicationContext';
// import { useCrossword } from '@/hooks/useCrossword';
// import useColorSchema from '../../hooks/useColorSchema';
import MenuItem from "../ui/menuItem";


const MainMenu = () => {
   const {openHelpModal, setOpenHelpModal,
          openConfirmModal, setOpenConfirmModal} = useApp();
  // const { undo, onNew, crossword } = useCrossword();
  // const { darkMode, setDarkMode } = useColorSchema();
  const { openMainMenu, // setOpenMainMenu
        } = useApp();

  const onHelpButtonClick = () => {
    setOpenHelpModal(!openHelpModal);
  };

  // const onUndoClickHandler = () => {
  //   undo();
  // };

  // const onRefreshGridClick = () => {
  //   onNew(crossword.height, crossword.width);
  // };

  // const onLiteModeClick = () => {
  //   setDarkMode(false);
  // };

  // const onDarkModeClick = () => {
  //   setDarkMode(true);
  // };

  // const onCreateMiniClick = () => {
  //   setOpenConfirmModal(!openConfirmModal);
  // };

  return <div className={"main-menu " +
                         (openMainMenu ? "menu-open" : "menu-closed")}>
           <nav>
             <ul>
               <MenuItem text="New Puzzle" onClickHandler={() => {}} />
               <MenuItem text="Settings" onClickHandler={() => {}}/>
               <MenuItem text="Help" onClickHandler={onHelpButtonClick}/>
             </ul>
           </nav>

           {/* <SubMenuButton title="Menu" icon={IconName.Bars} */}
           {/*                expandDirection={ExpandDirection.ExpandBelow}> */}
           {/*   <SubMenuButton title="New Crossword" icon={IconName.Plus} */}
           {/*                  expandDirection={ExpandDirection.ExpandRight}> */}
           {/*     <MenuButton title="New Mini Puzzle" */}
           {/*                 icon={IconName.MiniCrossword} */}
           {/*                 onClickHandler={onCreateMiniClick}/> */}
           {/*     <MenuButton title="New Midi Puzzle" */}
           {/*                 icon={IconName.MidiCrossword} */}
           {/*                 onClickHandler={onCreateMiniClick}/> */}
           {/*     <button className="btn">15x15</button> */}
           {/*     <button className="btn">Custom</button> */}
           {/*   </SubMenuButton> */}
           {/*   <SubMenuButton title="Edit Grid" icon={IconName.Pencil} */}
           {/*                  expandDirection={ExpandDirection.ExpandRight}> */}
           {/*     <MenuButton title="Undo Grid Action" icon={IconName.RotateLeft} */}
           {/*                 onClickHandler={onUndoClickHandler}/> */}
           {/*     <MenuButton title="Refresh Grid" icon={IconName.ArrowsRotate} */}
           {/*                 onClickHandler={onRefreshGridClick}/> */}
           {/*     <MenuButton title="Autofill Mode" icon={IconName.WandSparkles} /> */}
           {/*   </SubMenuButton> */}
           {/*   <SubMenuButton title="CrissCross Settings" icon={IconName.Wrench} */}
           {/*                  expandDirection={ExpandDirection.ExpandRight}> */}
           {/*     { */}
           {/*       darkMode ? */}
           {/*         <MenuButton title="Light Mode" onClickHandler={onLiteModeClick} */}
           {/*                     icon={IconName.Sun} /> : */}
           {/*       <MenuButton title="Dark Mode" icon={IconName.Moon} */}
           {/*                   onClickHandler={onDarkModeClick}/> */}
           {/*     } */}
           {/*   </SubMenuButton> */}
           {/*   <SubMenuButton title="Share" icon={IconName.Share} */}
           {/*                  expandDirection={ExpandDirection.ExpandRight}> */}
           {/*     <MenuButton title="Download" icon={IconName.Download}/> */}
           {/*   </SubMenuButton> */}
           {/*   <MenuButton title="Help Menu" icon={IconName.Question} */}
           {/*               onClickHandler={onHelpButtonClick}/> */}
           {/* </SubMenuButton> */}
         </div>;
};

export default MainMenu;
