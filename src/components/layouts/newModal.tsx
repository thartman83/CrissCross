import { useState } from 'react';
import Modal from './modal';
import SettingNumberInput from '../ui/settingNumberInput';
import { useCrossword } from '../../context/crosswordContext';

const NewModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {

  const [height, setHeight] = useState(15);
  const [width, setWidth] = useState(15);

  const {onNew} = useCrossword();

  const onCancelClickHandler = () => {
    setIsOpen(false);
  };

  const onCreateClickHandler = () => {
    onNew(height, width);
    setIsOpen(false);
  };

  const children = <>
                     <SettingNumberInput name="gridHeight" label="Grid Height"
                                     defaultValue={height} updater={setHeight} />
                     <SettingNumberInput name="gridWidth" label="Grid Width"
                                     defaultValue={width} updater={setWidth} />
                     <button className='btn btn-primary'
                             id="create" onClick={onCreateClickHandler}>
                       Create
                     </button>
                     <button className='btn btn-secondary'
                             id="cancel" onClick={onCancelClickHandler}>
                       Cancel
                     </button>
                   </>;

  const closeModalHandler = () => {

  };

  return (
    <Modal title="New Crossword" isOpen={isOpen} children={children}
           closeModalHandler={closeModalHandler}/>
  );
};

export default NewModal;
