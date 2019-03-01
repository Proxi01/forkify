import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            const key = 'ece82b660d963590661858bbbbe9badd';
            const res = await axios(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch (e){
            alert(e);
        }
    }
}
