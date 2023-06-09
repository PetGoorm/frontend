import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Diary from "./pages/Todo";
import SignUpPage from 'pages/SignUpPage';
import Header from 'frame/Header';
import LoginPage from 'pages/LoginPage';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Logout from 'components/member/Logout';
import PetFormPage from 'pages/PetFormPage';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('key')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (

    <div>
      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/todo" element={<Diary/>}/>
        <Route path='/member/signup' element={<SignUpPage/>}/>
        <Route path='/member/login' element={<LoginPage/>}/>
        <Route path='/member/logout' element={<Logout/>}/>
        <Route path='/pet/petform' element={<PetFormPage/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
