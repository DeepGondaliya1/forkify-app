import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _summaryElement = document.querySelector('.results__summary');
  _errorMessage =
    'No recipes found for your query. Try a different ingredient or dish ;)';
  _message = 'Search for a recipe or an ingredient to see results here.';

  /**
   * Render the "Results for ... / N recipes / page X of Y" summary line
   * @param {Object} search The search state (query, results, page, resultsPerPage)
   */
  renderSummary(search) {
    const total = search.results.length;
    const numPages = Math.ceil(total / search.resultsPerPage);

    if (!total) return this.clearSummary();

    const markup = `
      <p class="results__query">
        Results for <strong>“${search.query}”</strong>
      </p>
      <p class="results__count">
        ${total} ${total === 1 ? 'recipe' : 'recipes'}
        ${numPages > 1 ? `&middot; Page ${search.page} of ${numPages}` : ''}
      </p>
    `;
    this._summaryElement.innerHTML = markup;
  }

  clearSummary() {
    this._summaryElement.innerHTML = '';
  }

  renderSpinner() {
    this.clearSummary();
    super.renderSpinner();
  }

  renderError(message) {
    this.clearSummary();
    super.renderError(message);
  }

  scrollToTop() {
    this._parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
