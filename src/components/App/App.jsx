import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { useResize } from '../../hooks/useResize';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  // Состояние логина
  const [loggedIn, setLoggedIn] = React.useState(!!localStorage.getItem('jwt') || false);
  // Запрос в поиске
  const [query, setQuery] = React.useState('');
  // Фильмы
  const [movies, setMovies] = React.useState([]);
  // Сообщение об успешных изменениях данных юзера
  const [successMessage, setSuccessMessage] = React.useState('');
  // Фильмы пользователя
  const [savedMovies, setSavedMovies] = React.useState([]);
  // Показать прелоадер
  const [loading, setLoading] = React.useState(false);
  // Состояние чекбокса
  const [isChecked, setIsChecked] = React.useState(false);
  const [didUserSearch, setDidUserSearch] = React.useState(false);
  const [renderedMovies, setRenderedMovies] = React.useState(7);
  const navigate = useNavigate();
  const { isMobile } = useResize();

  React.useEffect(() => {
    if(isMobile) {
      setRenderedMovies(5);
    }
  }, [isMobile])

  // Показать больше фильмов
  function handleShowMoreMovies() {
    if(isMobile) {
      setRenderedMovies(renderedMovies + 5);
    } else {
      setRenderedMovies(renderedMovies + 7);
    }
  };

  const handleLogin = (data) => {
    return auth.authorize(data.email, data.password)
      .then((data) => {
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
        handleLogin(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('query');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    setQuery('');
    navigate('/');
  };

  // Проверка токена
  React.useEffect(() => {
    const tokenCheck = () => {
      if(!localStorage.getItem('jwt')) {
        navigate('/')
        return;
      };
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err);
          setLoggedIn(false);
        })
    };
    tokenCheck();
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
      if(localStorage.checkbox){
        setIsChecked(JSON.parse(localStorage.checkbox));
      }
      if(!localStorage.initialMovies){
        moviesApi.getInitialMovies()
          .then(initialMovies => {
            localStorage.setItem('initialMovies', JSON.stringify(initialMovies))
          })
          .catch((err) => console.log(err))
      };
      if(localStorage.query) {
        setQuery(localStorage.query);
        const moviesToShow = mapTheArray(
          JSON.parse(localStorage.initialMovies)
            .filter((movie) => movie.nameEN.toLowerCase().includes(localStorage.query.toLowerCase()) || movie.nameRU.toLowerCase().includes(localStorage.query.toLowerCase()))
        )
        showByCheckboxState(moviesToShow);
      };
      mainApi.getUserMovies()
        .then(userMovies => {
          showByCheckboxStateInSaved(userMovies);
          localStorage.setItem('savedMovies', JSON.stringify(userMovies))
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn, isChecked]);

  // Обновить данные пользователя
  function handleUpdateUserInfo(data){
    mainApi.setUserInfo(data)
      .then(userInfo => {
        setCurrentUser(userInfo);
        setSuccessMessage('Данные успешно обновлены');
      })
      .catch((err) => console.log(err))
  }

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

  // Отобразить фильмы по чекбоксу
  const showByCheckboxState = (moviesArray) => {
    if (!isChecked) {
      setMovies(moviesArray);
    } else {
      setMovies(moviesArray.filter((movie) => movie.duration < 41));
    }
  };

  // Отобразить фильмы по чекбоксу в сохраненных
  const showByCheckboxStateInSaved = (moviesArray) => {
    if (!isChecked) {
      setSavedMovies(moviesArray);
    } else {
      setSavedMovies(moviesArray.filter((movie) => movie.duration < 41));
    }
  };

  // Сделать из фильма, пришедшего с сервера, нормальную карточку фильма
  const mapTheArray = (array) => {
    return array.map(item => ({
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
  }

  // Глобальный поиск по фильмам
  const handleSearch = (e, searchWord) => {
    e.preventDefault();
    if(!query) return;
    setLoading(true);
    localStorage.setItem('query', query);
    setQuery(searchWord);
    const moviesToMap = JSON.parse(localStorage.initialMovies)
      .filter((movie) => movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()))
    const foundMovies = mapTheArray(moviesToMap);
    showByCheckboxState(foundMovies);
    setTimeout(setLoading(false), 1000);
    // setQuery('');
    setDidUserSearch(true);
  };

  // добавить фильм в список пользователя
  const handleAddToUserList = (card) => {
    const isLiked = savedMovies.some((item) => Number(item.movieId) === card.movieId);
    if (!isLiked){
      mainApi.addMovie(card)
        .then((card) => {
          setSavedMovies([...savedMovies, card]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      let movieToDelete = savedMovies.find((item) => Number(item.movieId) === card.movieId);
      mainApi.deleteMovie(movieToDelete._id)
        .then((card) => {
          const updatedsavedMovies = savedMovies.filter((data) => data._id !== card._id);
          setSavedMovies(updatedsavedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(updatedsavedMovies));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // удалить фильм из списка пользователя
  function handleDelete(card){
    mainApi.deleteMovie(card._id)
      .then((card) => {
        const updatedsavedMovies = savedMovies.filter((movie) => movie._id !== card._id);
        setSavedMovies(updatedsavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedsavedMovies));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Поиск по сохраненным
  const handleSearchWithinSaved = e => {
    e.preventDefault();
    if(!query) return;
    const foundMoviesWithinSaved = savedMovies
      .filter((movie) => movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()));
    showByCheckboxStateInSaved(foundMoviesWithinSaved)
    setQuery('');
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

            <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
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
                    renderedMovies={renderedMovies}
                    showMoreMovies={handleShowMoreMovies}
                />} />
              <Route 
                path="/saved-movies"
                element={
                  <SavedMovies
                    value={query}
                    onChange={setQuery}
                    onSearch={handleSearchWithinSaved}
                    onDelete={handleDelete}
                    cards={savedMovies}
                    loading={loading}
                    onCheck={handleToggleCheckbox}
                    savedMovies={savedMovies}
                  />} />
              <Route 
                path="/profile"
                element={
                  <Profile
                    onUpdateUserInfo={handleUpdateUserInfo}
                    onLogout={handleLogout}
                    successMessage={successMessage}/>} 
              />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
