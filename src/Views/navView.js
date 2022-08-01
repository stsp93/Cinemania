import View from "./View.js";

class NavView extends View {
    _parentElement = document.querySelector('.header__nav');
    _data;
    addNavHandler(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.nav__link');
            if(!btn) return;
            const query = btn.dataset.query;
            console.log(query);
            handler(query);
        }) 
    }
}
export default new NavView();