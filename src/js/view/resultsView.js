import PreviewView from './PreviewView';
import View from './View';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query.';
  _message = '';
  _generateMarkup() {
    return this._data.map(recipe => PreviewView.render(recipe, false)).join('');
  }
}

export default new resultsView();
