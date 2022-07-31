import * as model from './model.js';
import resultsView from './Views/resultsView.js';
import searchView from './Views/searchView.js';
import paginationView from './Views/paginationView.js';
import movieView from './Views/movieView.js';

const controlResults = async function () {
    try {
        // Load Results
        await model.loadResults(searchView.getQuery());
    
        // Render Results
        resultsView.render(model.getPageResults(1));
        // Render Pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.error(err);
        resultsView.renderError(err.message);
    }
}

const controlPagination = function (gotoPage) {

    // Render Page
    resultsView.render(model.getPageResults(gotoPage));

    // Render Pagination
    paginationView.render(model.state.search);

}
const controlMovie = async function(id) {
    try{
        // Load Results
        await model.loadMovie(id);
        // Render Results
        movieView.render(model.state.movie);
    
        // Show Container
        movieView.showContainer();

    } catch (err) {
        console.error(err);
        movieView.renderError(err.message);
    }
    
}

const controlCloseMovie = function() {
    movieView.hideContainer();
}

const init = function () {
    searchView.addHandlerRender(controlResults);
    paginationView.addPaginationHandler(controlPagination);
    resultsView.addMovieRenderHandler(controlMovie);
    movieView.addCloseBtnHandler(controlCloseMovie)
}
init();
