import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; 
import { validateEmail, validatePassword } from "../utils/validate";
// reducer 
import { useGlobalContext } from "../context/useUserContext";
import { SET_USER } from "../features/userActions";


const Registration = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  // данные для формы 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // сообщения об ошибках 
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    userEmail: '',
    userPassword: '',
  });

  // Удалить сообщение об ошибке спустя 5 сек
  useEffect(() => {
   const id = setTimeout(() => {
    setMessage('');
   },5000);

   return () => clearTimeout(id);
  },[message]);


  const handleReg = (e) => {
    e.preventDefault();
    //  если форма не заполнена 
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage('Заполните данные.')
      return;
    }
    //  если нет ошибок заполнения 
    if (!errors.userName && !errors.userEmail && !errors.userPassword) {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // существует ли такой пользователь
      if (!users.some((item) => item.email === email)) {
        const user = {
          id: Date.now(),
          name,
          email,
          password,
          notes: [],
        }
        // добавление пользователя 
        localStorage.setItem('users', JSON.stringify([...users, user]));
        dispatch({ type: SET_USER, payload: user });
    
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        setMessage('Такой пользователь уже существует.');
      }
    }
    return;
  }

  return (
    <div className="fixed bg top-0 h-full w-full text-blue-800">
      <div className="w-[290px] pb-3 md:w-[400px] mx-auto backdrop-blur-md 
      shadow-md shadow-blue-300 rounded-lg flex flex-col items-center gap-3">
       {/* логотип */}
        <Link to='/'>
        <img src={logo} className="w-24" alt="log" />
        </Link>
        {/* регистрационная форма  */}
        <form onSubmit={handleReg}
        className="flex flex-col w-5/6 gap-2 font-medium">
           <h2 className="text-2xl md:text-3xl font-bold mb-3">Регистрация</h2>
          {/* имя  */}
          <label htmlFor="name">Имя:</label>
          <input type="text" id="name" value={name}
          className="rounded-md pl-4 lg:py-2 text-blue-950 outline-none" placeholder="Имя"
            onChange={(e) => setName(e.target.value)} />
           {/* почта  */}
          <label htmlFor="email">Эл.почта:</label>
          <input type="email" id="email" value={email}
          className="rounded-md pl-4 lg:py-2 text-blue-950 outline-none" placeholder="user@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>{ setErrors({
              ...errors,
              userEmail: validateEmail(email),
            })}} />
            <p className="text-red-600">{errors.userEmail}</p>
             {/* пароль  */}
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" value={password}
          className="rounded-md pl-4 lg:py-2 text-blue-950 outline-none" placeholder="пароль из 8 символов"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {setErrors({
              ...errors,
              userPassword: validatePassword(password),
            })} }/>
            <p className="text-red-600">{errors.userPassword}</p>
          {/* отправка формы  */}
          <button type="submit" 
          className="mt-4 bg-blue-950 lg:py-2 ml-5 md:ml-16 text-white rounded-lg w-[200px]
          hover:opacity-90 drop-shadow-lg">
            Зарегестрироваться
            </button>
        </form>
            <p className="text-red-800">{message}</p>
            {/* войти  */}
        <i className="mt-3 text-gray-700">Уже есть аккаунт ? </i>
        <Link to='/login' className="text-gray-700 underline">
        Нажмите, чтобы войти
        </Link>
      </div>
    </div>
  );
}

export default Registration;
