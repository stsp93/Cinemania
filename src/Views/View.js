export default class View {
    _data;

    _clear() {
        this._parentElement.innerHTML = ''
    }

    render(data) {
        if (!data || data.length === 0) console.error('Error');;
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    showContainer() {
        this._parentElement.classList.remove('hidden');
    }
    
    hideContainer() {
        this._parentElement.classList.add('hidden');
        this._clear();
    }
}