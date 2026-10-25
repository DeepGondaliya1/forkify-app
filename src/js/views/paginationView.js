import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(page, direction) {
    const isNext = direction === 'next';
    return `
      <button data-goto="${page}"
        class="btn--inline pagination__btn pagination__btn--${direction}"
        aria-label="Go to page ${page}">
        ${
          isNext
            ? ''
            : `<svg class="search__icon"><use href="${icons}#icon-arrow-left"></use></svg>`
        }
        <span>${isNext ? 'Next' : 'Previous'}</span>
        ${
          isNext
            ? `<svg class="search__icon"><use href="${icons}#icon-arrow-right"></use></svg>`
            : ''
        }
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Only one page: no pagination needed
    if (numPages <= 1) return '';

    const prev =
      curPage > 1
        ? this._generateMarkupButton(curPage - 1, 'prev')
        : '<span class="pagination__spacer"></span>';

    const next =
      curPage < numPages
        ? this._generateMarkupButton(curPage + 1, 'next')
        : '<span class="pagination__spacer"></span>';

    return `
      ${prev}
      <p class="pagination__status" aria-live="polite">
        Page <strong>${curPage}</strong> of ${numPages}
      </p>
      ${next}
    `;
  }
}

export default new PaginationView();
