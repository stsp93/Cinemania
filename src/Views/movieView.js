import View from "./View.js";

class MovieView extends View{
    _parentElement = document.querySelector('.overlay');
    _data;

    _generateMarkup() {
        return `<div
        class="overlay__container"
        style="background-image: url(${this._data.image})"
      >
        <button class="overlay__btn-close">&#10060;</button>

        <div class="overlay__description">
          <div class="flex">
            <h3 class="overlay__title">${this._data.title} (${this._data.year})</h3>
            <h4 class="overlay__rating">IMDB Rating⭐${this._data.imDbRating}</h4>
          </div>
          <p class="overlay__plot">
            ${this._data.plot}
          </p>
          <p class="actors">
            <strong>Actors:</strong> ${this._data.stars}
          </p>
          <p class="genres">
            <strong>Genres:</strong> ${this._data.genres}
          </p>
        </div>
      </div>`
    }
    

    addMovieRenderHandler(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const movieId = e.target.closest('.movie__card').dataset.id;
            if(!movieId) return;

            handler(id);
        })
    }

    addCloseBtnHandler(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.overlay__btn-close');
            if(!btn) return;
            handler()
        })
    }
    
}
export default new MovieView();