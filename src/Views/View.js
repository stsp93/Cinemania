export default class View {
    _data;

    _clear() {
        this._parentElement.innerHTML = ''
    };

    render(data) {
        if (!data || data.length === 0) throw new Error('Nothing found, please try again!');
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    addRenderHandler(handler) {
        window.addEventListener('hashchange', function() {
            const [details,id] = window.location.hash.slice(1).split('?id=');
            if(!details) return;
            handler(id, details);
        })
    };

    renderError(message = 'Something went wrong') {
        const markup = `<div class ="error"><p>${message}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    showContainer() {
        this._parentElement.classList.remove('hidden');
    };
    
    hideContainer() {
        this._parentElement.classList.add('hidden');
        this._clear();
    };

    addResizeObserverHandler = function(handler){
        new ResizeObserver(() => {
            handler()
        }).observe(document.body)
        
    } 
        
}