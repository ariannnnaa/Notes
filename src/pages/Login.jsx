import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from '../assets/images/logo.png'; 
import { validateEmail,validatePassword } from "../utils/validate";
// reducer 
import { useGlobalContext } from "../context/useUserContext";
import { SET_USER } from "../features/userActions";


const Login = () => {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate();
    //   данные для формы 
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
        }, 5000);

        return () => clearTimeout(id);
    }, [message]);


    const handleLogin = (e) => {
        e.preventDefault();
        //  если форма не заполнена 
    if (!email.trim() || !password.trim()) {
        setMessage('Заполните данные.')
        return;
      }
      //  если нет ошибок заполнения 
      if (!errors.userEmail && !errors.userPassword) {
    const users = JSON.parse(localStorage.getItem('users'));
        // есть ли такой пользователь 
       if(users){
        const user = users.find((item)=> {
          return item.email === email && item.password === password
        });
        // в случае нахождения пользователя
        if(user){
        //выбрать текущего пользователя
        dispatch({type: SET_USER, payload: user});
  
             setEmail('');
             setPassword('');
             navigate('/users/user');
            return;
        }
       }
       setMessage('Неправильный логин или пароль');
      }

      return;
    }

    return (
       <div className="fixed bg top-0 h-full w-full text-blue-800">
             <div className="w-[290px] pb-3 md:w-[400px] mx-auto mt-3 backdrop-blur-md 
             shadow-md shadow-blue-300 rounded-lg flex flex-col items-center gap-3">
              {/* логотип */}
               <Link to='/'>
               <img src={logo} className="w-24" alt="log" />
               </Link>
               {/* форма  */}
               <form onSubmit={handleLogin}
               className="flex flex-col w-5/6 gap-2 font-medium">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Вход</h2>
                  {/* почта  */}
                 <label htmlFor="email">Эл.почта:</label>
                 <input type="email" id="email" value={email}
                 className="rounded-md pl-4 py-2 text-blue-950 outline-none" placeholder="user@gmail.com"
                   onChange={(e) => setEmail(e.target.value)}
                   onBlur={() =>{ setErrors({
                     ...errors,
                     userEmail: validateEmail(email),
                   })}} />
                   <p className="text-red-600">{errors.userEmail}</p>
                    {/* пароль  */}
                 <label htmlFor="password">Пароль:</label>
                 <input type="password" id="password" value={password}
                 className="rounded-md pl-4 py-2 text-blue-950 outline-none" placeholder="пароль из 8 символов"
                   onChange={(e) => setPassword(e.target.value)}
                   onBlur={() => {setErrors({
                     ...errors,
                     userPassword: validatePassword(password),
                   })} }/>
                   <p className="text-red-600">{errors.userPassword}</p>
                    {/* отправка формы  */}
                 <button type="submit" 
                 className="mt-4 bg-blue-950 py-2 ml-5 md:ml-16 text-white rounded-lg w-[200px]
                 hover:opacity-90 drop-shadow-lg">
                  Войти
                   </button>
               </form>
                   <p className="text-red-800">{message}</p>
                   {/* зарегестрироваться  */}
               <i className="mt-3 text-gray-700">Еще нет аккаунта ? </i>
               <Link to='/signUp' className="text-gray-700 underline">
               Нажмите, чтобы зарегестрироваться
               </Link>
             </div>
           </div>
    );
}

export default Login;
