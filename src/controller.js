import * as model from './model.js';
import resultsView from './Views/resultsView.js';
import searchView from './Views/searchView.js';
import paginationView from './Views/paginationView.js';
import overlayView from './Views/overlayView.js';
import navView from './Views/navView.js';


const controlResults = async function (query,details) {
    try {
        //Check routing
        if(details === 'details') return;

        //Save Selected Search
        model.state.search.select = searchView.getSelected();

        // Load Results
        await model.loadResults(searchView.getQuery());
    
        // Render Results
        resultsView.render(model.getPageResults(1));

        // Deactivate nav links
        navView.deactivateNavLink();

        // Render Pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.error(err);
        resultsView.renderError(err.message);
    }
}

const controlNav = async function (_,query) {
    try{
    // Check routing
    if(query === 'details') return;

    // change the state
    model.state.search.select = 'movie';

    // Load results
   await model.loadNavResults(query)

    // Activate nav link
    navView.activateNavLink(query);

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
const controlResultDetails = async function(id) {
    try{
        if(!+id) return;

        // Load Results
        await model.loadDetails(id);
        // Render Results
        overlayView.render(model.state.resultDetails);
    
        // Show Container
        overlayView.showContainer();

    } catch (err) {
        console.error(err);
        overlayView.renderError(err.message);
    }    
}

const controlCloseDetails = function() {
    overlayView.hideContainer();
    window.location.hash = ''
}

const init = function () {  
    searchView.addSearchHandlerRender(controlResults);
    paginationView.addPaginationHandler(controlPagination);
    resultsView.addRenderHandler(controlResultDetails);
    overlayView.addCloseBtnHandler(controlCloseDetails)
    navView.addRenderHandler(controlNav);
}
init();
