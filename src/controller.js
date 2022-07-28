import * as model from './model.js';
import resultsView from './Views/resultsView.js';
import searchView from './Views/searchView.js';

const controlResults = async function() {
    // Load Results
    await model.loadResults(searchView.getQuery());

    // Render Results
    resultsView.render(model.state.search.results);
}
const init = function() {
    searchView.addHandlerRender(controlResults);
}
init();
