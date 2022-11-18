import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * render the received object to the DOM
   * @param {Object | Object[]} data
   * @param {boolean} [render = true] if false create markup string instead of rendering it
   * @returns {undefined | string} returned string if render is false
   * @this {Object} View instance
   * @author nika cuckiridze
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const oldElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((el, i) => {
      if (
        !el.isEqualNode(oldElements[i]) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        oldElements[i].textContent = el.textContent;
      }
      if (!el.isEqualNode(oldElements[i])) {
        Array.from(el.attributes).forEach(attr =>
          oldElements[i].setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError = (message = this._errorMessage) => {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    );
  };

  renderMessage(message = this._message) {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `
         <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    );
  }

  renderSpinner() {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `
    );
  }
}
