import PreviewView from './PreviewView';
import View from './View';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it.';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(recipe => PreviewView.render(recipe, false)).join('');
  }
}

export default new bookmarksView();
