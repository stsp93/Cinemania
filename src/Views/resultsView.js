import View from "./View.js";

class ResultsView  extends View{
    _parentElement = document.querySelector('.cards__container');
    _data;
    _generateMovieCard(movie) {
        // #movie?id=tt10954984
        const id = movie.id.replace(`showtimes`, '')
        return `<a href="#show?id=${id}" class="movie__card" style="background-image:url(${movie.image});">
        <h4 class="movie__card-title">${movie.title} ${movie.year}</h4>
      </a>`
    };

    _generateMarkup() {
        return this._data.map(this._generateMovieCard).join('');
    }
   
}
export default new ResultsView();

/* data
Array(10) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
​
0: Object { id: "tt0145487", title: "Spider-Man", image: "https://imdb-api.com/images/original/MV5BZDEyN2NhMjgtMjdhNi0…MTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_Ratio0.7273_AL_.jpg", … }

*/ 