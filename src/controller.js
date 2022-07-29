import * as model from './model.js';
import resultsView from './Views/resultsView.js';
import searchView from './Views/searchView.js';
import paginationView from './Views/paginationView.js';
import movieView from './Views/movieView.js';

const controlResults = async function () {
    // Load Results
    await model.loadResults(searchView.getQuery());

    // Render Results
    resultsView.render(model.getPageResults(1));
    // Render Pagination
    paginationView.render(model.state.search)
}

const controlPagination = function (gotoPage) {

    // Render Page
    resultsView.render(model.getPageResults(gotoPage));

    // Render Pagination
    paginationView.render(model.state.search);

}
const controlMovie = async function(id) {
    // Show Container
    movieView.showContainer();

    // Load Results
    await model.loadMovie(id)
    // Render Results
    console.log(model.state.movie);
    movieView.render(model.state.movie);
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
