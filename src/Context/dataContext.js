import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const DataContext = createContext();

export function DataContextProvider(props) {
    const [accessAdminToken, setAccessAdminToken] = useLocalStorage("130314042807", '');
    const [accessToken, setAccessToken] = useLocalStorage("token", '');
    const [logged, setLogged] = useLocalStorage('logged', false);
    const [line, setLine] = useLocalStorage('lines', []);
    const url = 'https://infotpm-backend-production.up.railway.app';
    const value = {
        logged, setLogged,
        accessAdminToken, setAccessAdminToken,
        accessToken, setAccessToken,
        line, setLine,
        url
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
}