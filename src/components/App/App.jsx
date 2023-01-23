import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Footer from '../Footer/Footer.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  // const [query, setQuery] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterOk, setIsRegisterOk]  = React.useState(false);
  const [cards, setCards] = React.useState([]);
  // const navigate = useNavigate();

  // const handleLogin = (email, password) =>{
  //   return auth.authorize(email, password)
  //     .then((data) => {
  //       localStorage.setItem('jwt', data.token)
  //       setLoggedIn(true);
  //       navigate('/movies');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // };

  // const handleRegister = (name, email, password) =>{
  //   return auth.register(name, email, password)
  //     .then(() =>{
  //       navigate('/signin');
  //       setIsRegisterOk(true);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // const handleLogout = () => {
  //   if (!localStorage.getItem('jwt')) return;
  //   localStorage.removeItem('jwt');
  //   setLoggedIn(false);
  //   setCurrentUser({});
  //   navigate('/sign-in');
  // };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
