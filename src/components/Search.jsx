import { useState } from "react";
import { useSearchContext } from "../context/useSearchContext";
import { FiSearch } from "react-icons/fi"; // значок поиска 
// reducer 
import { useGlobalContext } from "../context/useUserContext";

const Search = () => {
    const { state } = useGlobalContext();
    //    данные поиска 
    const [searchValue, setSearchValue] = useState('');
    //  результат поиска 
    const { setResult } = useSearchContext();


    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = state.user.notes.filter((item) => {
            return item.title.toLowerCase().includes(searchValue.toLowerCase())
        });
        setResult(filtered);
    }


    const reset = () => {
        if (!searchValue.trim()) {
            setResult(null);
        }
    }

    return (
        <form className="bg-blue-900 text-zinc-50 w-3/4 sm:w-2/3 mx-auto lg:my-7 p-3 rounded-lg
         flex gap-4" onSubmit={handleSearch}>
            <button type="submit">
                <FiSearch className="size-6" />
            </button>
            <input type="text" placeholder="Поиск по названию"
                className="bg-transparent w-full outline-none"
                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                onBlur={reset} />
        </form>
    );
}

export default Search;
