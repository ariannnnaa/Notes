import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const UserPageProvider = ({children}) => {
const [result, setResult] = useState(null);

    return <SearchContext.Provider value={{result,setResult}}>
        {children}
    </SearchContext.Provider>
}

const useSearchContext = () => {
    return useContext(SearchContext);
}

export {UserPageProvider, useSearchContext};