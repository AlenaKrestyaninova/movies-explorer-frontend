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
  const [savedMovies, setSavedMovies] = React.useState([]);
  // Показать прелоадер
  const [loading, setLoading] = React.useState(false);
  // Состояние чекбокса
  const [isChecked, setIsChecked] = React.useState(false);
  const [didUserSearch, setDidUserSearch] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    return auth.authorize(data.email, data.password)
      .then((data) => {
        console.log(data);
        setUserName(data.name);
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleRegister = (data) => {
    return auth.register(data.name, data.email, data.password)
      .then(() =>{
        navigate('/signin');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('checkbox');
    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    navigate('/sign-in');
  };

  // Проверка токена
  React.useEffect(() => {
    const tokenCheck = () => {
      if(!localStorage.getItem('jwt')) return;
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            navigate('/movies');
          }
        })
        .catch(err => {
          console.log(err);
        })
    };
    tokenCheck()
  }, [])

  // Загрузить информацию о пользователе
  React.useEffect(()=>{
    if(loggedIn){
      mainApi.getUserInfo()
        .then(userInfo => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  // Получить изначальные фильмы при загрузке страницы
  React.useEffect(()=>{
    if (loggedIn){
      if(localStorage.foundMovies){
        setMovies(JSON.parse(localStorage.foundMovies));
      };
      if(location.pathname === '/saved-movies') {
        setMovies(JSON.parse(localStorage.savedMovies));
      }
      setIsChecked(JSON.parse(localStorage.checkbox));
    }
  }, [loggedIn]);

  // Обновить данные пользователя
  function handleUpdateUserInfo(data){
    mainApi.setUserInfo(data)
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err))
  }

  // Проверка состояния чекбокса
  const checkCheckbox = (moviesArray) => {
    if(isChecked){
      return moviesArray.filter((movie) => movie.duration < 41)
    } else {return moviesArray}
  };

  // Переключение состояния чекбокса
  const handleToggleCheckbox = () => {
    if (!isChecked) {
      setIsChecked(true);
      localStorage.setItem('checkbox', JSON.stringify(true));
    } else {
      setIsChecked(false);
      localStorage.setItem('checkbox', JSON.stringify(false));
    }
  };

  // Глобальный поиск по фильмам
  const handleSearch = e => {
    e.preventDefault();
    if(!query) return;
    setLoading(true);
    moviesApi.getInitialMovies()
      .then(initialMovies => {
        const moviesToFilter = initialMovies
          .filter((movie) => movie.nameEN.toLowerCase().includes(query.toLowerCase()))
          .map(item => ({
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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  };

  // добавить фильм в список пользователя
  const handleAddToUserList = (card) => {
    // const isLiked = savedMovies.some((item) => Number(item.movieId) === card.movieId);
    // if (!isLiked){
      mainApi.addMovie(card)
        .then((card) => {
          setSavedMovies([...savedMovies, card]);
        })
        .catch((err) => {
          console.error(err);
        });
    // } else {
    //   let movieIdToDelete = card._id;
    //   mainApi.deleteMovie(movieIdToDelete)
    //     .then(() => {
    //       const updatedsavedMovies = savedMovies.filter((data) => data._id !== movieIdToDelete);
    //       setSavedMovies(updatedsavedMovies);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  };

  // удалить фильм из списка пользователя
  function handleDelete(card){
    mainApi.deleteMovie(card._id)
      .then(() => {
        const updatedsavedMovies = savedMovies.filter((data) => data._id !== card._id);
        setSavedMovies(updatedsavedMovies);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Поиск по сохраненным
  const handleSearchWithinSaved = e => {
    e.preventDefault();
    if(!query) return;
    const foundMoviesWithinSaved = savedMovies.filter((movie) => movie.nameEN.toLowerCase().includes(query.toLowerCase()));
    setSavedMovies(foundMoviesWithinSaved);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
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
                  onDelete={handleDelete}
                  cards={movies}
                  loading={loading}
                  didUserSearch={didUserSearch}
                  isChecked={isChecked}
                  onCheck={handleToggleCheckbox}
                  savedMovies={savedMovies}
              />} />
            <Route 
              path="/saved-movies"
              element={
                <SavedMovies
                  value={query}
                  onChange={setQuery}
                  onSearch={handleSearchWithinSaved}
                  onDelete={handleDelete}
                  cards={movies}
                  loading={loading}
                  savedMovies={savedMovies}
                />} />
            <Route path="/profile" element={<Profile onUpdateUserInfo={handleUpdateUserInfo} onLogout={handleLogout} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
