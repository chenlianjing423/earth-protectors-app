import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = (
  key,
  initialValue,
  schema,
) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);

    if (item) {
      const parsedResult = schema.safeParse(JSON.parse(item));
      if (parsedResult.success) {
        return parsedResult.data;
      }
    }
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });

  useEffect(() => {
    // sync with local storage in case other tabs update the localstorage
    const handleStorageChange = (e) => {
      if (e.key === key) {
        if (e.newValue == null) {
          setStoredValue(null);
          return;
        }

        const parsedResult = schema.safeParse(JSON.parse(e.newValue));
        if (parsedResult.success) {
          setStoredValue(parsedResult.data);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, schema]);

  const setValue = useCallback(
    (value) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      setStoredValue(value);
    },
    [key],
  );

  /**
   *
   * value will be the state that can be reflected in the UI.
   *
   * setValue will set the value in localStorage and update the state.
   *
   * getLocalStorage will act as a source of truth for the value of the key in localStorage.
   */
  const getLocalStorageValue = useCallback(() => {
    const item = localStorage.getItem(key);
    if (item) {
      const parsedResult = schema.safeParse(JSON.parse(item));
      if (parsedResult.success) {
        return parsedResult.data;
      }
    }
    return null;
  }, [key, schema]);

  return {
    value: storedValue,
    setValue,
    getLocalStorageValue,
  };
};
