import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { BASE_URL_MOVIES } from '../../utils/config';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  // Состояние логина
  const [loggedIn, setLoggedIn] = React.useState(false);
  // Запрос в поиске
  const [query, setQuery] = React.useState('');
  // Фильмы
  const [movies, setMovies] = React.useState([]);
  // Имя пользователя для профиля
  const [userName, setUserName] = React.useState('');
  // Фильмы пользователя
  const [userMovies, setUserMovies] = React.useState([]);
  // Лайкнут ли фильм (для кнопки лайка)
  const [isMovieAdded, setIsMovieAdded] = React.useState(false);
  // Показать прелоадер
  const [loading, setLoading] = React.useState(false);
  // Состояние чекбокса
  const [isChecked, setIsChecked] = React.useState(false);
  const [didUserSearch, setDidUserSearch] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (email, password) =>{
    return auth.authorize(email, password)
      .then((data) => {
        setUserName(data.name);
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleRegister = (name, email, password) =>{
    return auth.register(name, email, password)
      .then(() =>{
        navigate('/signin');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    setUserMovies([]);
    navigate('/sign-in');
  };

  React.useEffect(()=>{
    if(loggedIn){
      mainApi.getUserInfo()
        .then(userInfo => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  // React.useEffect(()=>{
  //   if (loggedIn){
  //     moviesApi.getInitialMovies()
  //       .then(cards => { 
  //         setCards(cards)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [loggedIn]);

  // Получить изначальные фильмы при загрузке страницы (добавить сюда loggedIn)
  React.useEffect(()=>{
    if (!localStorage.initialMovies){
      moviesApi.getInitialMovies()
      .then(initialMovies => {
        localStorage.setItem('initialMovies', JSON.stringify(initialMovies))
      })
      .catch((err) => console.log(err))
    };
    if(localStorage.foundMovies){
      setMovies(JSON.parse(localStorage.foundMovies));
    };
    if(location.pathname === '/saved-movies') {
      setMovies(JSON.parse(localStorage.userMovies));
    }
  }, []);

  // Просерка состояния чекбокса
  const checkCheckbox = (moviesArray) => {
    if(isChecked){
      return moviesArray.filter((movie) => movie.duration < 41)
    } else {return moviesArray}
  };

  // Глобальный поиск по фильмам
  const handleSearch = e => {
    e.preventDefault();
    if(!query) return;
    setLoading(true);
    const moviesToFilter = JSON.parse(localStorage.initialMovies)
      .filter((movie) => movie.nameEN.toLowerCase().includes(query.toLowerCase()))
      .map(item => ({
        id: item.id,
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: BASE_URL_MOVIES + item.image.url,
        trailerLink: item.trailerLink,
        thumbnail: BASE_URL_MOVIES + item.image.formats.thumbnail.url,
        movieId: item.id,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
      }));
    const foundMovies = checkCheckbox(moviesToFilter);
    setMovies(foundMovies);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
    setQuery('');
    setDidUserSearch(true);
    setLoading(false)
  };

  // добавить фильм в список пользователя
  const handleAddToUserList = (card) => {
    if (!isMovieAdded){
      mainApi.addMovie(card)
        .then((card) => {
          setUserMovies([...userMovies, card]);
          localStorage.setItem('userMovies', JSON.stringify(userMovies))
          setIsMovieAdded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      let movieIdToDelete = card._id;
      mainApi.deleteMovie(movieIdToDelete)
        .then(() => {
          const updatedUserMovies = userMovies.filter((data) => data._id !== movieIdToDelete);
          setUserMovies(updatedUserMovies);
          setIsMovieAdded(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // удалить фильм из списка пользователя
  function handleDelete(card){
    let movieIdToDelete = card._id;
    mainApi.deleteMovie(movieIdToDelete)
      .then(() => {
        const updatedUserMovies = userMovies.filter((data) => data._id !== movieIdToDelete);
        setUserMovies(updatedUserMovies);
        setIsMovieAdded(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}
          />
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/movies"
              element={
                <Movies
                  value={query}
                  onChange={setQuery}
                  onSearch={handleSearch}
                  onAddToUserList={handleAddToUserList}
                  isMovieAdded={isMovieAdded}
                  onDelete={handleDelete}
                  cards={movies}
                  loading={loading}
                  didUserSearch={didUserSearch}
                  isChecked={isChecked}
                  onCheck={setIsChecked}
              />} />
            <Route 
              path="/saved-movies"
              element={
                <SavedMovies
                  loading={loading}
                />} />
            <Route path="/profile" element={<Profile userName={userName} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
