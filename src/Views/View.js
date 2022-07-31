export default class View {
    _data;

    _clear() {
        this._parentElement.innerHTML = ''
    }

    render(data) {
        if (!data || data.length === 0) throw new Error('Nothing found, please try again!');
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = 'Something went wrong') {
        const markup = `<div class ="error"><p>${message}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    showContainer() {
        this._parentElement.classList.remove('hidden');
    }
    
    hideContainer() {
        this._parentElement.classList.add('hidden');
        this._clear();
    }

}