import { useSearchContext } from "../context/useSearchContext";
import SingleNote from "./SingleNote";
// reducer 
import { useGlobalContext } from "../context/useUserContext";

const NotesContainer = () => {
    const { state } = useGlobalContext();
    const { result } = useSearchContext();
    // заметки для вывода 
    const data = result ? result : state.user.notes;

    // У пользователя нет заметок 
    if (!state.user.notes.length) return (
        <p className="text-center mt-14 text-gray-400 font-semibold text-2xl">
            У вас пока нет записей.
        </p>
    );

    // У пользователя есть заметки
    return <>
            {/* по запросу поиска  */}
            {data.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
            justify-items-center my-12 gap-4">
                    {data.map((item) => {
                        return <SingleNote key={item.id} {...item} />
                    })}
                </div>
            ) : (
                <p className="text-center mt-8 text-blue-900 text-xl">
                    По вашему запросу ничего не найдено.
                    </p>
            )}
        </>
}

export default NotesContainer;
