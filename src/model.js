import { API_KEY, API_URL, IMAGES_URL, RESULTS_PER_PAGE, MEDIA_QUERIES} from "./config.js";

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
        console.log(`${API_URL}search/${state.search.select}${API_KEY}&query=${query}`);
        const res = await fetch(`${API_URL}search/${state.search.select}${API_KEY}&query=${query}`);
        const data = await res.json();
        console.log(data);
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
        year: data.release_date?.slice(0, 4) || 'N/A',
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
        id: data.id || 'N/A',
        title: data.title || 'N/A',
        image: IMAGES_URL + data.poster_path || 'N/A',
        plot: data.overview || 'N/A',
        year: data.release_date.slice(0, 4) || 'N/A',
        rating: Number(data.vote_average).toFixed(1) || 'N/A',
        runtime: (data.runtime || 'N/A') + ' m',
        genre: data.genres.map(obj => obj.name).join(', ') || 'N/A',
    }

};
const personDataProcess = function (data) {
    return {
        type: state.search.select,
        name: data.name,
        image: IMAGES_URL + data.profile_path,
        born: data.birthday || 'N/A',
        died: data.deathday,
        age: _calculateAge(data.birthday),
        birthPlace: data.place_of_birth || 'N/A',
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

        for(let i = 0; i < MEDIA_QUERIES.length; i++){
            const match = window.matchMedia(MEDIA_QUERIES[i]);
            if(match.matches) {
                state.search.resultsPerPage = i + 1;
                break;
            } ;
            state.search.resultsPerPage = RESULTS_PER_PAGE;
        }
}
