import { API_KEY, SEARCH_MOVIE_URL, NO_PICTURE, RESULTS_PER_PAGE } from "./config.js";

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
        // debugger;
        const res = await fetch(`${SEARCH_MOVIE_URL}${API_KEY}/${query}`);
        const data = await res.json();
        state.search.results = data.results.filter(mov => mov.image !== NO_PICTURE).map(mov => {
            return {
                id: mov.id,
                title: mov.title,
                image: mov.image,
                year: mov.description.slice(0, 6),
            }
        });
        console.log(state.search.results);
    } catch (err) {
        console.error(err);
    }
}

export const getResultsPerPage = function (page = state.search.page) {
    state.search.page = +page;
    const startIndex = page - 1;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return state.search.results.slice(startIndex, endIndex);
}