import View from "./View.js";

class ResultsView  extends View{
    _parentElement = document.querySelector('.cards__container');
    _data;
    _generateMovieCard(movie) {
        return `<li class="movie__card" data-id="${movie.id}" style="background-image:url(${movie.image});">
        <h4 class="movie__card-title">${movie.title} ${movie.year}</h4>
      </li>`
    };

    _generateMarkup() {
        return this._data.map(this._generateMovieCard).join('');
    }
    

    addMovieRenderHandler(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const movieCard = e.target.closest('.movie__card');
            if(!movieCard) return;
            const movieId = movieCard.dataset.id;
            handler(movieId);
        })
    }
}
export default new ResultsView();

/* data
Array(10) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
​
0: Object { id: "tt0145487", title: "Spider-Man", image: "https://imdb-api.com/images/original/MV5BZDEyN2NhMjgtMjdhNi0…MTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_Ratio0.7273_AL_.jpg", … }

*/ 