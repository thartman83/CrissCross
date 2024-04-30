import { useState } from 'react';
import Modal from './modal';
import SettingNumberInput from '../ui/settingNumberInput';
import useCrossword from '@/hooks/useCrossword';

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

  const closeModalHandler = () => {

  };

  return (
    <Modal title="New Crossword" isOpen={isOpen}
           closeModalHandler={closeModalHandler}>
      <SettingNumberInput name="gridHeight" label="Grid Height"
                          defaultValue={height} updater={setHeight} />
      <SettingNumberInput name="gridWidth" label="Grid Width"
                          defaultValue={width} updater={setWidth} />
      <div className='btn-group'>
        <button className='btn' onClick={onCreateClickHandler}>Create</button>
        <button className='btn' onClick={onCancelClickHandler}>Cancel</button>
      </div>
    </Modal>
  );
};

export default NewModal;
