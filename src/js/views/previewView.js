import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const isActive = this._data.id === id;

    return `
      <li class="preview">
        <a class="preview__link ${isActive ? 'preview__link--active' : ''}"
          href="#${this._data.id}"
          aria-current="${isActive ? 'page' : 'false'}"
          title="${this._data.title}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="" loading="lazy" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
          </div>
          <div class="preview__badges">
            <span class="preview__badge preview__badge--user ${
              this._data.key ? '' : 'hidden'
            }" title="Your recipe" aria-label="Your recipe">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </span>
            <span class="preview__badge preview__badge--bookmark ${
              this._data.bookmarked ? '' : 'hidden'
            }" title="Bookmarked" aria-label="Bookmarked">
              <svg>
                <use href="${icons}#icon-bookmark-fill"></use>
              </svg>
            </span>
          </div>
          <svg class="preview__arrow" aria-hidden="true">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
