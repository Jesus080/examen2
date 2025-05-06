import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
 
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtener de localStorage por key
      const item = window.localStorage.getItem(key);
      // Analizar el JSON almacenado o devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Función para actualizar tanto el estado como localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para que tengamos la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Guardar al estado
      setStoredValue(valueToStore);
      // Guardar a localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
