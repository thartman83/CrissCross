import {useState} from 'react';
import { useApp } from '../../context/applicationContext';
import { useCrossword } from '../../context/crosswordContext';
import { FaBars, FaArrowsRotate, FaQuestion, FaRotateLeft,
         FaWrench, FaPlus } from '../ui/faIcons';


const MainMenu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const {openHelpModal, setOpenHelpModal,
         openNewModal, setOpenNewModal} = useApp();
  const { undo } = useCrossword();

  const onMenuClickHandler = () => {
    setDisplayMenu(!displayMenu);
  };

  const onHelpButtonClick = () => {
    setOpenHelpModal(!openHelpModal);
  };

  const onNewButtonClick = () => {
    setOpenNewModal(!openNewModal);
  };

  const onUndoClickHandler = () => {
    undo();
  };

  return <div className='main-menu'>
           <button className='btn' title="Undo"
             onClick={onUndoClickHandler}><FaRotateLeft/></button>
           <button className="btn" title="Main Menu"
                   onClick={onMenuClickHandler}><FaBars></FaBars></button>
           <ul className={"menu-list " + (displayMenu && "active")}>
             <li><button className='btn' title="New Crossword"
                 onClick={onNewButtonClick}><FaPlus/></button></li>
             <li><button className='btn' title="Reset Current Crossword"
                 ><FaArrowsRotate/></button></li>
             <li><button className='btn' title="CrissCross Settings"
                 ><FaWrench/></button></li>
             <li><button className='btn' title="Help Menu"
                         onClick={onHelpButtonClick}><FaQuestion/></button></li>
           </ul>
         </div>;
};

export default MainMenu;
