import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6"; // значок плюса
// components 
import Search from "./Search";
import AddNoteModal from "./AddNoteModal";
import NotesContainer from "./NotesContainer";

const Notes = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div>
      <h2 className="text-center my-9 font-bold text-2xl lg:text-4xl text-blue-950">
        Ваши заметки
      </h2>
      {/* Поиск по заметкам */}
      <Search />
      {/* Добавить новую заметку  */}
      <button className="mt-6 w-3/5 mx-auto block text-blue-900 border-2 rounded-xl
            p-3 effect hover:bg-gray-100 hover:text-blue-600" onClick={handleModal}>
        <FaCirclePlus className="mx-auto size-7" />
      </button>
      {/* модальное окно создания заметок  */}
      {openModal && <AddNoteModal handleModal={handleModal} />}
      {/* Список заметок  */}
     <NotesContainer />
    </div>
  );
}

export default Notes;
