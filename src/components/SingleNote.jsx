import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6"; // значок удаления 
// reducer 
import { useGlobalContext } from "../context/useUserContext";
import { CHANGE_NOTE } from "../features/userActions";


const SingleNote = ({ id, title, text, date }) => {
    const { dispatch } = useGlobalContext();
    //  режимы редактора 
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditText, setIsEditText] = useState(false);
    // поля заполнений
    const [heading, setHeading] = useState(title);
    const [content, setContent] = useState(text);

    const editTitle = () => {
        dispatch({ type: CHANGE_NOTE, payload: { noteId: id, title: heading, operation: 'editTitle' } });
        setIsEditTitle(false);
    }

    const editText = () => {
        dispatch({ type: CHANGE_NOTE, payload: { noteId: id, text: content, operation: 'editText' } });
        setIsEditText(false);
    }

    return (
        <div className='bg-gray-50 drop-shadow-md min-h-[300px] w-[250px] lg:w-[300px] 
        rounded-md p-6 relative flex flex-col justify-between'>
            {/* удаление заметки  */}
            <FaTrashCan className="absolute right-4 top-5 cursor-pointer hover:text-gray-700"
                onClick={() => dispatch({ type: CHANGE_NOTE, payload: {noteId: id, operation: 'remove'} })} />
            <div>
                {/* Название  */}
                {!isEditTitle ? (
                    //   обычный режим 
                    <h3 onClick={() => setIsEditTitle(true)}
                        className="border-b mb-5 h-[50px] overflow-hidden break-words mr-4 pb-2 font-bold cursor-pointer">
                        {title ? title : 'Название'}
                    </h3>
                ) : (
                    // режим редактирования 
                    <input type="text" value={heading}
                        className="bg-gray-50 mb-5 border pl-2 font-bold outline-slate-300"
                        onChange={(e) => setHeading(e.target.value)}
                        onBlur={editTitle} />
                )}
                {/* Текст */}
                {!isEditText ? (
                    //   обычный режим 
                    <p onClick={() => setIsEditText(true)}
                    className="min-h-[200px] break-words cursor-pointer">
                        {text ? text : 'Текст'}
                    </p>
                ) : (
                    // режим редактирования 
                    <textarea value={content}
                        className="h-[150px] w-[200px] bg-gray-50 border outline-slate-300"
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={editText}>
                            {text}
                            </textarea>
                )}
            </div>
            <i className="text-gray-600 mt-4">создано: {date}</i>
        </div>
    );
}

export default SingleNote;
