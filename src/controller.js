import * as model from './model.js';
import resultsView from './Views/resultsView.js';
import searchView from './Views/searchView.js';
import paginationView from './Views/paginationView.js';

const controlResults = async function () {
    // Load Results
    await model.loadResults(searchView.getQuery());

    // Render Results
    resultsView.render(model.getResultsPerPage());
    // Render Pagination
    paginationView.render(model.state.search)
}

const controlPagination = function (gotoPage) {

    // Render Page
    resultsView.render(model.getResultsPerPage(gotoPage));

    // Render Pagination
    paginationView.render(model.state.search);

}

const init = function () {
    searchView.addHandlerRender(controlResults);
    paginationView.addPaginationHandler(controlPagination)
}
init();
