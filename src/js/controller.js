import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './view/recipeView';
import seachView from './view/seachView';
import resultsView from './view/resultsView';
import paginationView from './view/paginationView';
import bookmarksView from './view/bookmarksView';
import addRecipeView from './view/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
///////////////////////////////////////

// // !! parcel specific thing. hot reload wont happen. page will not be reloading al THE TIME.
// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) on every hash change update search result (add active class to right one)
    resultsView.update(model.getSearchResultPage());

    //  1) load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // update bookmarks on displayed recipes and on nav bar

    bookmarksView.update(model.state.bookmarks);

    // 2) Show the recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = seachView.getQuery();
    await model.loadSearchResults(query);
    // render saerch results
    resultsView.render(model.getSearchResultPage());
    // render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError('nonono');
  }
};

const controlPagination = goTo => {
  // render new saerch results
  resultsView.render(model.getSearchResultPage(goTo));
  // render new pagination buttons
  paginationView.render(model.state.search);
};

const contorlServings = newServings => {
  // update recipe servings in state
  model.updateServings(newServings);
  // update recipe view
  const { recipe } = model.state;
  recipeView.update(recipe);
};

const controlAddBookmark = () => {
  if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe.id);
  } else model.addBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlUpload = async data => {
  try {
    // spinner
    addRecipeView.renderSpinner();
    // post
    await model.uploadRecipe(data);
    console.log(model.state.recipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // render bookmarks
    bookmarksView.render(model.state.bookmarks);
    // success message
    addRecipeView.renderMessage();

    // change url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close modal window
    setTimeout(
      addRecipeView.toggleWindow.bind(addRecipeView),
      MODAL_CLOSE_SEC * 1000
    );
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(contorlServings);
  recipeView.addHandleAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  seachView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUpload);
};

init();
