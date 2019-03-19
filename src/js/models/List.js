import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);

        //Save storage
        this.persistData();

        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el=>el.id === id);

        this.items.splice(index, 1);

        //Save storage
        this.persistData();
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;

        //Save storage
        this.persistData();
    }

    persistData(){
        localStorage.setItem('items', JSON.stringify(this.items))
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('items'));

        //Restore likes from the localStorage
        if(storage) this.items = storage;
    }
}