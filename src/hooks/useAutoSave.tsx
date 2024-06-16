import { useState } from 'react';

const useAutoSave = () => {
  const [autoSave, setAutoSave] = useState<boolean>(false);

  return {
    autoSave,
    setAutoSave,
  };
};

export default useAutoSave;
