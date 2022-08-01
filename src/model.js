import { API_KEY, API_URL, IMAGES_URL, RESULTS_PER_PAGE } from "./config.js";

export const state = {
    movie: {},
    search: {
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
        select: '',
    },
};

export const loadResults = async function (query = '') {
    try {
        const res = await fetch(`${API_URL}search/${state.search.select}${API_KEY}&query=${query}`);
        const data = await res.json();
        console.log(data);
        state.search.results = data.results.filter(res => res.adult === false &&
            (res.poster_path !== null ||
                res.profile_path !== 0)).map(res => {
                    if(state.search.select === 'movie') return movieResultProcess(res);
                    if(state.search.select === 'person') return personResultProcess(res);
                });
        state.search.results = state.search.results.filter(el => !el.image.endsWith('null'));
        // console.log(state.search.results);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!')
    };
};



export const loadMovie = async function (id) {
    try {
        const res = await fetch(`${API_URL}${state.selected}/${id}${API_KEY}`);
        const data = await res.json();
        state.movie = movieDataProcess(data);
        console.log(state.movie);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!');
    };
};

export const loadPerson = async function (id) {
    try {
        const res = await fetch(`${API_URL}movie/${id}${API_KEY}`);
        const data = await res.json();
        state.movie = movieDataProcess(data);
        console.log(state.movie);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!');
    };
};

export const getPageResults = function (page = state.search.page) {
    state.search.page = +page;
    const startIndex = page - 1;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return state.search.results.slice(startIndex, endIndex);
};

const movieResultProcess = function (data) {
    return {
        id: data.id,
        title: data.title,
        image: IMAGES_URL + data.poster_path,
        year: data.release_date.slice(0, 4),
        title: data.title || res.name,
    }
};
const personResultProcess = function (data) {
    return {
        id: data.id,
        title: data.name,
        image: IMAGES_URL + data.profile_path,
        knownFor: data.known_for_department,
    }
};
const movieDataProcess = function (data) {
    return {
        id: data.id || '',
        title: data.title || '',
        image: IMAGES_URL + data.poster_path || '',
        plot: data.overview || '',
        year: data.release_date.slice(0, 4) || '',
        rating: Number(data.vote_average).toFixed(1) || '',
        runtime: data.runtime + ' m' || '',
        genre: data.genres.map(obj => obj.name).join(', ') || '',
    }

};
const personDataProcess = function (data) {
    return {
        name: data.name,
        image: IMAGES_URL + data.profile_path,
        born: data.birthdate,
        died: ' - ' + data.deathday || '',
        birthPlace: data.place_of_birth,
        knownFor: data.known_for_department,

    }
}
