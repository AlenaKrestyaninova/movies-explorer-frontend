import { BASE_URL } from './config.js';

class MainApi {
    constructor({host, headers}){
        this._host = host;
        this._headers = headers;
    }

    /* Вернуть результат или ошибку*/
    _getJsonOrError(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    /* Получить фильмы пользователя*/
    getUserMovies(){
        return fetch(`${this._host}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Добавить фильм в сохраненные*/
    addMovie(movieCard){
        return fetch(`${this._host}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieCard)
        })
        .then(this._getJsonOrError)
    }

    /* Удалить фильм из сохраненных*/
    deleteMovie(movieId){
        return fetch(`${this._host}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Запросить данные о юзере*/
    getUserInfo(){
        return fetch(`${this._host}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Запостить данные о юзере*/
    setUserInfo(newUserData){
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newUserData.name,
                email: newUserData.email,
            }),
        })
        .then(this._getJsonOrError)
    }

}

const mainApi = new MainApi({
    host: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
    },
});

export default mainApi;