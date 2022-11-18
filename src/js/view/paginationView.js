import View from './View';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(hanlder) {
    this._parentElement.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;

      const goTo = +button.dataset.goto;
      return hanlder(goTo);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    const page = this._data.page;
    // this is first page and there are more
    if (page === 1 && numPages > 1) {
      return `
      <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }
    // this is last page and ther are more
    if (page === numPages && page > 1) {
      return `  
      <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page - 1}</span>
  </button>
      `;
    }
    // on of  middle pages
    if (page > 1 && page < numPages) {
      return `
      <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page - 1}</span>
    </button>
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }
    //  just first page exists
    return '';
  }
}

export default new paginationView();
