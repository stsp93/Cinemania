import View from "./View.js";

class NavView extends View {
    _parentElement = document.querySelector('.header__nav');
    _data;
    deactivateNavLink() {
        this._parentElement.querySelectorAll('.nav__link').forEach(e => e.classList.remove('nav__active'))
    }
    activateNavLink(elClass) {
        this.deactivateNavLink()
        this._parentElement.querySelector(`.${elClass}`).classList.add('nav__active');
    }
}
export default new NavView();