import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import {
  AppActions,
  appReducer,
  AppState,
  initialState,
} from 'reducers/app-reducer';

import PublicGoogleSheetsParser from 'public-google-sheets-parser';
type AppContextProps = {
  state: AppState;
  dispatch: Dispatch<AppActions>;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps>(null!);

// Proveedor del contexto
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(
      '15bJDxtjRCyGkKYYwytL49mmbYmt35q-C2L6WW6HpuHw',
    );
    parser.parse().then((data) => {
      dispatch({ type: 'fetch-data', payload: { data } });
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
