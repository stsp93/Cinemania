import { API_KEY, API_URL, IMAGES_URL, RESULTS_PER_PAGE } from "./config.js";

export const state = {
    resultDetails: {},
    search: {
        results: [],
        page: 1,
        resultsPerPage: 0,
        select: '',
    },
};

export const loadResults = async function (query = '') {
    try {
        const res = await fetch(`${API_URL}search/${state.search.select}${API_KEY}&query=${query}`);
        const data = await res.json();
        state.search.results = data.results.map(res => {
            if (state.search.select === 'movie') return movieResultProcess(res);
            if (state.search.select === 'person') return personResultProcess(res);
        });
        state.search.results = state.search.results.filter(res => !res.image.endsWith(null));
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!')
    };
};

export const loadNavResults = async function (query = '') {
    try {
        const res = await fetch(`${API_URL}movie/${query}${API_KEY}`);
        const data = await res.json();
        state.search.results = data.results.filter(res => res.adult === false &&
            (res.poster_path !== null ||
                res.profile_path !== 0)).map(res => movieResultProcess(res));
        // console.log(state.search.results);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!')
    };
}

export const loadDetails = async function (id) {
    try {
        const res = await fetch(`${API_URL}${state.search.select}/${id}${API_KEY}`);
        const data = await res.json();
        state.resultDetails =
            state.search.select === 'movie' ?
                movieDataProcess(data) :
                personDataProcess(data);
        // console.log(state.resultDetails);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to connect to server!');
    };
};


export const getPageResults = function (page = state.search.page) {
    state.search.page = +page;
    const startIndex = page - 1;
    const endIndex = startIndex + state.search.resultsPerPage;
    return state.search.results.slice(startIndex, endIndex);
};

const movieResultProcess = function (data) {
    return {
        type: state.search.select,
        id: data.id,
        title: data.title,
        image: IMAGES_URL + data.poster_path,
        year: data.release_date.slice(0, 4),
        title: data.title || res.name,
    }
};
const personResultProcess = function (data) {
    return {
        type: state.search.select,
        id: data.id,
        title: data.name,
        image: IMAGES_URL + data.profile_path,
        knownFor: data.known_for_department,
    }
};
const movieDataProcess = function (data) {
    return {
        type: state.search.select,
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
        type: state.search.select,
        name: data.name,
        image: IMAGES_URL + data.profile_path,
        born: data.birthday || '',
        died: data.deathday || '',
        age: _calculateAge(data.birthday),
        birthPlace: data.place_of_birth || '',
        knownFor: data.known_for_department,

    }
}
function _calculateAge(birthday) { // birthday is a date
    if (!birthday) return '';
    const ageDifMs = Date.now() - new Date(birthday);
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const mediaQueries = function () {
    const mediaQueries = [
        '(max-width: 37em)',
        '(max-width: 50em)',
        '(max-width: 60em)',
        '(max-width: 71em)']

        for(let i = 0; i < mediaQueries.length; i++){
            const match = window.matchMedia(mediaQueries[i]);
            if(match.matches) {
                console.log(match);
                state.search.resultsPerPage = i + 1;
                console.log(state.search.resultsPerPage);
                break;
            } ;
            state.search.resultsPerPage = RESULTS_PER_PAGE;
        }
}
