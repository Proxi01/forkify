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

        //    Search for recipes
        await state.search.getResults();

        //Loader removing
        clearLoader();

        //    Render results on UI
        searchView.renderResults(state.search.result)
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

const r = new Recipe(46956);
r.getRecipe();
console.log(r);