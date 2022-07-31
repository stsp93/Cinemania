import { API_KEY, SEARCH_MOVIE_URL, NO_PICTURE, RESULTS_PER_PAGE, GET_MOVIE_BY_ID } from "./config.js";

export const state = {
    movie: {},
    search: {
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    },
}

export const loadResults = async function (query) {
    try {
        const res = await fetch(`${SEARCH_MOVIE_URL}${API_KEY}/${query}`);
        const data = await res.json();
        state.search.results = data.results.filter(res => res.image !== NO_PICTURE).map(res => {
            return {
                id: res.id,
                title: res.title,
                image: res.image,
                year: res.description.match(/[0-9]{4}/g) ? `(${res.description.match(/[0-9]{4}/g)})` : '',
            }
        });
    } catch (err) {
        console.log(err);
        throw new Error('Unable to connect to server!')
    }
}

export const loadMovie = async function (id) {
    try {
        const res = await fetch(`${GET_MOVIE_BY_ID}${API_KEY}/${id}`);
        const data = await res.json();
        state.movie = data
            
    } catch (err) {
        throw new Error('Unable to connect to server!');
    }
}

export const getPageResults = function (page = state.search.page) {
    state.search.page = +page;
    const startIndex = page - 1;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return state.search.results.slice(startIndex, endIndex);
}