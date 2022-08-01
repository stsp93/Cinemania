import View from "./View.js";

class SearchView  extends View{
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query
    }
    getSelected() {
        return this._parentElement.querySelector('.search__select').value;
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = ''
    }

    addSearchHandlerRender(handler){
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }


}

export default new SearchView();