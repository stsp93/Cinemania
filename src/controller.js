import * as model from './model.js';
import resultsView from './Views/resultsView.js';

const controlMovie = async function() {
    // Load Results
    await model.loadResults('potter');

    // Render Results
    resultsView.render(model.state.results);
}
controlMovie();
