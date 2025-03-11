import { createContext, useContext, useReducer } from "react";
// reducer 
import reducer from '../features/userReducer';
import {current} from '../features/userReducer';

const UserContext = createContext();

const AppProvider = ({children}) => {
const [state, dispatch] = useReducer(reducer,current);

    return <UserContext.Provider value={{state, dispatch}}>
            {children}
    </UserContext.Provider>
}

const useGlobalContext = () => {
    return useContext(UserContext);
}

export {AppProvider,useGlobalContext};