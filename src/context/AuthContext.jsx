/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { z } from "zod";

export const AuthContext = createContext(null);

const DIRECTUS_AUTH_LOCALSTORAGE_KEY = import.meta.env
  .VITE_DIRECTUS_AUTH_LOCALSTORAGE_KEY;

export const authenticationDataSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.number(),
  expires: z.number(),
});

export const AuthProvider = (props) => {
  const {
    value: authData,
    getLocalStorageValue: getAuthLocalStorage,
    setValue: setAuthData,
  } = useLocalStorage(
    DIRECTUS_AUTH_LOCALSTORAGE_KEY,
    null,
    authenticationDataSchema,
  );

  const token = authData?.access_token ?? null;
  const isLoggedIn = token != null;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, authData, setAuthData, getAuthLocalStorage }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
