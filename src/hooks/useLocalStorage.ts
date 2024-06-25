import { UseStorage } from "@/types/storageStrategy";

const useLocalStorage: UseStorage = <Type>(key: string, def: Type) => {

  const setLocalStorage = (obj: Type) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  const getLocalStorage = (): Type => {
    const ret = localStorage.getItem(key);

    if(typeof ret === 'undefined' || ret === 'undefined' || ret === null) {
      setLocalStorage(def);
      return def;
    }

    return JSON.parse(ret);
  };

  return [
    getLocalStorage,
    setLocalStorage,
  ];
};

export default useLocalStorage;
