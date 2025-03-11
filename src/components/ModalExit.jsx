import { useNavigate } from 'react-router';
// reducer 
import { useGlobalContext } from '../context/useUserContext';
import { EXIT } from '../features/userActions';

const ModalExit = ({ handleModal }) => {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate();

    // выход из аккаунта 
    const handleGetOut = () => {
        dispatch({ type: EXIT });
        navigate('/');
        handleModal();
    }

    return (
        <div className='fixed z-10 w-full h-full top-0 left-0 backdrop-blur-md'>
           
            <div className='w-[300px] md:w-[400px] mx-auto mt-40 bg-blue-900 text-white
             flex flex-col items-center p-3 md:p-5 text-center text-lg gap-5 rounded-md'>
                <h3 className='text-xl lg:text-2xl font-bold'>Выход из аккаунта</h3>
                <p>Вы действительно уверены, что хотите выйти из своего аккаунта?</p>
                <div className='flex gap-6 mt-2'>
                    <button onClick={handleGetOut}>Да</button>
                    <button onClick={handleModal}>Отмена</button>
                </div>
            </div>

        </div>
    );
}

export default ModalExit;
