import View from "./View.js";

class OverlayView extends View {
    _parentElement = document.querySelector('.overlay');
    _data;

    _movieMarkup() {
        return `<div
        class="overlay__container"
        style="background-image: url(${this._data.image})"
      >
        <button class="overlay__btn-close">&#10060;</button>

        <div class="overlay__description">
          <div class="flex">
            <h3 class="overlay__title">${this._data.title} ${this._data.year !== null ? '(' + this._data.year + ')' : ''}</h3>
            <p class="overlay__rating">Rating⭐${this._data.rating}/10</p>
          </div>
          <p class="details">Runtime: ${this._data.runtime}</p>
          <p class="overlay__plot">
            ${this._data.plot}
          </p>
          <p class="details">
            <strong>Genres:</strong> ${this._data.genre}
          </p>
        </div>
      </div>`
    }

    _personMarkup() {
        return `<div
        class="overlay__container"
        style="background-image: url(${this._data.image})"
      >
        <button class="overlay__btn-close">&#10060;</button>

        <div class="overlay__description">
          <div class="flex">
            <h3 class="overlay__title">${this._data.name}</h3>
            <p class="overlay__rating">Known for ${this._data.knownFor}</p>
          </div>
          <p class="details">Born: ${this._data.born}</p>
          <p class="details">${this._data.died ? `Died: ${this._data.died}` : 
          `Age: ${this._data.age}`
            }</p>     
          <p class="overlay__plot">
            <strong>Place of Birth</strong>: ${this._data.birthPlace}
          </p>
        </div>
      </div>`
    }

    _generateMarkup() {
        if (this._data.type === 'movie') return this._movieMarkup();
        if (this._data.type === 'person') return this._personMarkup();
    }



    addCloseBtnHandler(handler) {
        this._parentElement.addEventListener('click', function (e) {
            // Closes when clicked outside the container or the close button
            const btn = e.target === this ? this : e.target.closest('.overlay__btn-close');
            if (!btn) return;
            handler()
        })
    }

}
export default new OverlayView();