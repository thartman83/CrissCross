import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useColorSchema = () => {

  const darkModeStorageKey = 'color-schema';
  const systemDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const appDark = localStorage.getItem(darkModeStorageKey);

  // We are going to prefer that application local storage to the system settings
  // default to system settings if local storage is undefined
  const defaultDarkMode = typeof appDark === 'undefined' ? !!systemDark :
    appDark === 'true';

  const [darkMode, setDarkMode] = useState<boolean>(defaultDarkMode);

  useEffect(() => {
    darkMode ? document.body.classList.add('dark') :
      document.body.classList.remove('dark');
    localStorage.setItem(darkModeStorageKey, String(darkMode));
  }, [darkMode]);

  return {
    darkMode,
    setDarkMode
  };
};

export default useColorSchema;
