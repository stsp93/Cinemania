import View from "./View.js";

class SearchView  extends View{
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = ''
    }

    addSearchHandlerRender(handler){
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const selected = this.querySelector('.search__select').value;
            handler(selected);
        })
    }


}

export default new SearchView();