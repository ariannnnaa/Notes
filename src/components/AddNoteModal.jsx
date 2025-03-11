import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa"; // значок крестика  
import { currentDate } from "../utils/currentDate";
// reducer 
import { useGlobalContext } from "../context/useUserContext";
import { ADD_NOTE } from "../features/userActions";


const AddNoteModal = ({ handleModal }) => {
    const { dispatch } = useGlobalContext();
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const createNote = (e) => {
        e.preventDefault();
        if (text.trim() || title.trim()) {
            const note = {
                id: Date.now(),
                title,
                text,
                date: currentDate(),
            }
            dispatch({ type: ADD_NOTE, payload: note });
 
            setText('');
            setTitle('');
            handleModal();
        }
        return
    }

    return (
        <div className="fixed z-10 w-full h-full top-0 left-0 backdrop-blur-md">

            <div className="bg-white text-blue-900 relative mx-auto mt-20 w-11/12 md:w-[500px] h-[80vh] 
            rounded-lg pt-12 font-semibold drop-shadow-md">
                <FaRegWindowClose className="absolute top-3 left-2 size-6 md:size-8 cursor-pointer hover:opacity-75" onClick={handleModal} />
                <h2 className="text-center text-xl md:text-2xl font-bold">Создайте новую запись</h2>
                {/* форма для заполнения  */}
                <form className="flex flex-col w-5/6 mx-auto gap-3 mt-12" onSubmit={createNote}>
                   {/* название заметки  */}
                    <label htmlFor="title">Название:</label>
                    <input type="text" id="title" className="border p-2 outline-none"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                 {/* текст заметки  */}
                    <label htmlFor="text">Содержимое</label>
                    <textarea id="text" className="border p-2 outline-none h-[150px]" placeholder="Напишите что-нибудь..."
                        value={text} onChange={(e) => setText(e.target.value)} />
                   
                    <button type="submit"
                        className="border hover:opacity-90 bg-blue-950 rounded-md mt-5 text-white py-2">
                        Создать
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddNoteModal;
