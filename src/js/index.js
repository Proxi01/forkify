import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'
import Search from './models/Search';
import Recipe from './models/Recipe';


/*Global state of the app
* -Search Object
* -Current recipe Object
* -Shopping list object
* -Likes object
* */
const state = {}

/*
    SEARCH CONTROLLER
*/
const controlSearch = async ()=>{
    //Get query from view
    const query =  searchView.getInput();

    if(query){
    //    New Search object and add it to state
        state.search = new Search(query)

    //    Prepare UI to results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //    Search for recipes
            await state.search.getResults();

            //Loader removing
            clearLoader();

            //    Render results on UI
            searchView.renderResults(state.search.result)
        }
        catch (e) {
            alert('Something wrong in the search...')
        }

    }
}

elements.searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline')
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})


/*
* RECIPE CONTROLLER
* */

const controlRecipe = async ()=>{
    // Get an id from the url
    const id = window.location.hash.replace('#', '');

    if(id){
    //    Prepare UI to changes

    //    Create a new recipe object
        state.recipe = new Recipe(id);

        try {
            //    Get recipe data
            await state.recipe.getRecipe();

            state.recipe.parseIngredients();
            //     Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //    Render recipe
            console.log(state.recipe);
        }
        catch (e) {
            alert('Error processing recipe!');
            console.log(e)
        }

    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));