import { useApp } from '../../context/applicationContext';
import { useCrossword } from '../../context/crosswordContext';
import useColorSchema from '../../hooks/useColorSchema';
import { IconName } from '../ui/faIcons';
import MenuButton from '../ui/menuButton';
import SubMenuButton, { ExpandDirection } from '../ui/subMenuButton';


const MainMenu = () => {
  const {openHelpModal, setOpenHelpModal} = useApp();
  const { undo, onNew, crossword } = useCrossword();
  const { darkMode, setDarkMode } = useColorSchema();

  const onHelpButtonClick = () => {
    setOpenHelpModal(!openHelpModal);
  };

  const onUndoClickHandler = () => {
    undo();
  };

  const onRefreshGridClick = () => {
    onNew(crossword.height, crossword.width);
  };

  const onLiteModeClick = () => {
    setDarkMode(false);
  };

  const onDarkModeClick = () => {
    setDarkMode(true);
  }

  return <div className='main-menu'>
           <SubMenuButton title="Menu" icon={IconName.Bars}
                          expandDirection={ExpandDirection.ExpandBelow}>
             <SubMenuButton title="New Crossword" icon={IconName.Plus}
                            expandDirection={ExpandDirection.ExpandRight}>
               <button className="btn">5x5</button>
               <button className="btn">11x11</button>
               <button className="btn">15x15</button>
               <button className="btn">Custom</button>
             </SubMenuButton>
             <SubMenuButton title="Edit Grid" icon={IconName.Pencil}
                            expandDirection={ExpandDirection.ExpandRight}>
               <MenuButton title="Undo Grid Action" icon={IconName.RotateLeft}
                           onClickHandler={onUndoClickHandler}/>
               <MenuButton title="Refresh Grid" icon={IconName.ArrowsRotate}
                           onClickHandler={onRefreshGridClick}/>
               <MenuButton title="Autofill Mode" icon={IconName.WandSparkles} />
             </SubMenuButton>
             <SubMenuButton title="CrissCross Settings" icon={IconName.Wrench}
                            expandDirection={ExpandDirection.ExpandRight}>
               {
                 darkMode ?
                   <MenuButton title="Light Mode" onClickHandler={onLiteModeClick}
                               icon={IconName.Sun} /> :
                 <MenuButton title="Dark Mode" icon={IconName.Moon}
                             onClickHandler={onDarkModeClick}/>
               }
             </SubMenuButton>
             <SubMenuButton title="Share" icon={IconName.Share}
                            expandDirection={ExpandDirection.ExpandRight}>
               <MenuButton title="Download" icon={IconName.Download}/>
             </SubMenuButton>
             <MenuButton title="Help Menu" icon={IconName.Question}
                         onClickHandler={onHelpButtonClick}/>
           </SubMenuButton>
         </div>;
};

export default MainMenu;
