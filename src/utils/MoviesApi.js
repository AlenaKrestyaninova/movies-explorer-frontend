import { BASE_URL_INIT_MOVIES } from './config.js';

class MoviesApi {
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

    /* Получить изначальные фильмы с сервера*/
    getInitialMovies(){
        return fetch(`${this._host}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }
}

const moviesApi = new MoviesApi({
    host: BASE_URL_INIT_MOVIES,
    headers: {
        "Content-Type": "application/json",
    },
});

export default moviesApi;