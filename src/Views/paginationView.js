class PaginationView {
    _parentElement = document.querySelector('.btn__container');
    _data;

    _generateLeftArrow() {
        return `<button class="btn btn__left">
        <img class="icon__arrow" src="img/arrow-left.svg" alt="left arrow">
      </button>`
    };
    _generateRightArrow() {
        return `<button class="btn btn__right">             
        <img class="icon__arrow" src="img/arrow-right.svg" alt="right arrow">
      </button>`
    };

    _generateMarkup() {
        if(this._data.length > 10) return this._generateRightArrow();
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
export default new PaginationView();