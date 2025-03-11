import {Routes, Route} from 'react-router';
// components 
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
//pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserPage from './pages/UserPage';

function App() {

  return (
    <>
    <Header />
    <Routes>
      {/* все страницы */}
    <Route path='/' element={<Home/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signUp' element={<Registration/>}/>
   
    {/* защищенный маршрут  */}
    <Route element={<ProtectedRoute/>}>
     <Route path='users/user' element={<UserPage/>}/>
    </Route>
    
    </Routes>
    </>
  )
}

export default App;
