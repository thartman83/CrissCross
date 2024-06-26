import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useStorage from './useLocalStorage';

const useColorSchema = () => {
  const darkModeStorageKey = 'color-schema';
  const [getColorSchema, setColorSchema] = useStorage(darkModeStorageKey);
  const systemDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const appDark = getColorSchema();

  // We are going to prefer that application local storage to the system settings
  // default to system settings if local storage is undefined
  const defaultDarkMode = typeof appDark === 'undefined' ? !!systemDark :
    appDark === 'true';

  const [darkMode, setDarkMode] = useState<boolean>(defaultDarkMode);

  useEffect(() => {
    darkMode ? document.body.classList.add('dark') :
      document.body.classList.remove('dark');

    setColorSchema(darkMode);
  }, [darkMode]);

  return {
    darkMode,
    setDarkMode
  };
};

export default useColorSchema;
