import {elements} from './views/base'
import * as searchView from './views/searchView'
import Search from './models/Search';


/*Global state of the app
* -Search Object
* -Current recipe Object
* -Shopping list object
* -Likes object
* */
const state = {}


const controlSearch = async ()=>{
    //Get query from view
    const query =  searchView.getInput();

    if(query){
    //    New Search object and add it to state
        state.search = new Search(query)

    //    Prepare UI to results
        searchView.clearInput();
        searchView.clearResults();

    //    Search for recipes
        await state.search.getResults();

    //    Render results on UI
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    controlSearch();
})
