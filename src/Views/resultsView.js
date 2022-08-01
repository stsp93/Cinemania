import View from "./View.js";

class ResultsView extends View {
    _parentElement = document.querySelector('.cards__container');
    _data;
    _generateCard(data) {
        const id = data.id;
        return `<a href="#details?id=${id}" class="movie__card" style="background-image:url(${data.image});">
        <h4 class="movie__card-title">${data.title} (${data.year || data.knownFor})</h4>
      </a>`
    };

    _generateMarkup() {
        return this._data.map(this._generateCard).join('');
    }

}
export default new ResultsView();

