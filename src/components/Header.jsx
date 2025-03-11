import { useState } from 'react';
import {Link} from 'react-router-dom';
// component 
import ModalExit from './ModalExit';
// reducer 
import { useGlobalContext } from '../context/useUserContext';
// значки
import logo from '../assets/images/logo.png' 
import { FaUserPlus } from "react-icons/fa6"; //регистрация 
import { FaUserCircle } from "react-icons/fa"; //вход
import { FaUserAltSlash } from "react-icons/fa"; //выйти
import { HiOutlineUserCircle } from "react-icons/hi"; //пользователь


const Header = () => {
  const { state } = useGlobalContext();
  const [openModal, setOpenModal] = useState(false);


  const handleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className='flex justify-between items-center container mx-auto text-sm px-2 text-blue-800 font-bold'>
     <Link to='/'>
      <img src={logo} className='size-24 md:size-36 effect hover:translate-y-2' alt="логотип" />
      </Link>
      {/* Регистрация/Вход/Выход */}
      {state.auth ? (
      <div className='flex gap-4 md:gap-9'>
            {/* текущий пользователь  */}
          <Link to='/users/user' className='flex flex-col items-center effect hover:translate-y-2'>
              <HiOutlineUserCircle className='size-7' />
              <i>{state.user.name}</i>
            </Link>
           {/* выход из аккаунта  */}
            <div className='flex flex-col items-center cursor-pointer effect hover:translate-y-2' 
            onClick={handleModal}>
          <FaUserAltSlash className='size-7' />
          <p>Выход</p>
        </div>
        {/* модальное окно для подтверждения выхода из аккаунта  */}
        {openModal && <ModalExit handleModal={handleModal}/>}
        </div>
      ) : (
          <div className='flex gap-3 md:gap-9'>
            {/* зарегестрироваться */}
            <Link to='/signUp' className='flex flex-col items-center effect hover:translate-y-2'>
              <FaUserPlus className='size-7' />
              <p>Регистрация</p>
            </Link>
            {/* войти  */}
            <Link to='/login' className='flex flex-col items-center effect hover:translate-y-2'>
              <FaUserCircle className='size-7' />
              <p>Войти</p>
            </Link>
          </div>
      )
      }
    </div>
  );
}

export default Header;
