import View from "./View.js";

class MovieView extends View{
    _parentElement = document.querySelector('.overlay');
    _data;

    _generateMarkup() {
        return `<div
        class="overlay__container"
        style="background-image: url(${this._data.image || ''})"
      >
        <button class="overlay__btn-close">&#10060;</button>

        <div class="overlay__description">
          <div class="flex">
            <h3 class="overlay__title">${this._data.title || ''} ${this._data.year !== null ? '('+this._data.year+')' : ''}</h3>
            <p class="overlay__rating">IMDB⭐${Number(this._data.imDbRating).toFixed(1) || ''}</p>
          </div>
          <p class="details">${this._data.type !== null ? '('+ this._data.type+')' : ''}</p>
          <p class="overlay__plot">
            ${this._data.plot || ''}
          </p>
          <p class="details">
            <strong>Actors:</strong> ${this._data.stars || ''}
          </p>
          <p class="details">
            <strong>Genres:</strong> ${this._data.genres || ''}
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
          // Closes when clicked outside the container or the close button
            const btn = e.target === this ? this : e.target.closest('.overlay__btn-close') ;
            if(!btn) return;
            handler()
        })
    }
    
}
export default new MovieView();