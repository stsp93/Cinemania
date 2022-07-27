import { API_KEY, SEARCH_MOVIE_URL } from "./config.js";

export const state = {
    movie: {},
    results: [],
}

export const loadResults = async function (query) {
    try {
        const res = await fetch(`${SEARCH_MOVIE_URL}${API_KEY}/${query}`);
        const data = await res.json();
        state.results = data.results.map(mov => {
            return {
                id: mov.id,
                title: mov.title,
                image: mov.image,
                year: mov.description.slice(0,6),
            }
        });
        console.log(state.results);
    } catch (err) {
        console.error(err);
    }
}