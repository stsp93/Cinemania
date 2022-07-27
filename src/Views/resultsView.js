class ResultsView {
    _parentElement = document.querySelector('.cards__container');
    _data;
    _generateMovieCard(movie) {
        return `<li class="movie__card" style="background-image:url(${movie.image});">
        <h4 class="movie__card-title">${movie.title} ${movie.year}</h4>
      </li>`
    };

    _generateMarkup() {
        return this._data.map(this._generateMovieCard).join('');
    }
    
    render(data) {
        if (!data || data.length === 0) console.error('Error');;
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    _clear() {
        this._parentElement.innerHTML = ''
    }
}
export default new ResultsView();

/* data
Array(10) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
​
0: Object { id: "tt0145487", title: "Spider-Man", image: "https://imdb-api.com/images/original/MV5BZDEyN2NhMjgtMjdhNi0…MTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_Ratio0.7273_AL_.jpg", … }

*/ 