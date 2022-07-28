import { API_KEY, SEARCH_MOVIE_URL,NO_PICTURE } from "./config.js";

export const state = {
    movie: {},
    search: {
        results: [],
        page:1
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