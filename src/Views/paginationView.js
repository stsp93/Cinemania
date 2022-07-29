import View from "./View.js";


class PaginationView extends View{
    _parentElement = document.querySelector('.btn__container');
    _data;

    _generateLeftArrow(curPage) {
        return `<button class="btn btn__left" data-goto="${+curPage - 1}">
        <img class="icon__arrow" src="img/arrow-left.svg" alt="left arrow">
      </button>`
    };
    _generateRightArrow(curPage) {
        return `<button class="btn btn__right" data-goto="${+curPage + 1}">             
        <img class="icon__arrow" src="img/arrow-right.svg" alt="right arrow">
      </button>`
    };

    _generateMarkup() {
        const curPage = this._data.page
        const firstPage = 1;
        const lastPage = this._data.results.length - this._data.resultsPerPage;

        //Less movies than movies per page (No pagination)
        if(lastPage <= 0) return '';

        // /Current page is 1 and more than 1 pages (->)
        if(curPage === firstPage) return this._generateRightArrow(curPage);

        // Current page is last (<-)
        if(curPage === lastPage) return this._generateLeftArrow(curPage);

        // Current page is in the middle (<- ->)
        return this._generateLeftArrow(curPage) + this._generateRightArrow(curPage);
    }

    addPaginationHandler(handler) {
      this._parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn');
        if(!btn) return;

        const gotoPage = +btn.dataset.goto;
        handler(gotoPage)
      })
    }
}
export default new PaginationView();