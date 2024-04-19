class List{
    constructor(value, btn){
        this._value = value;
        this._btnState = btn;
        this._index;
    }

    getValue(){
        return this._value;
    }

    setValue(content){
        this._value = content;
    }

    getButton(){
        return this._btnState;
    }
    
    setButton(state){
        this._btnState = state;
    }

    loadFromJSON(json){

        for (let name in json){

            switch(name){
                default:
                    this[name] = json[name];
            }
        }
    }

    static getListStorage(){ //gets all lists in the local storage

        let list = [];
        if(localStorage.getItem("tasks")){

            list = JSON.parse(localStorage.getItem("tasks"));

        }

        return list;
    }

    saveStorage() {
        let list = List.getListStorage();
    
        if (this._index > 0) {
            list = list.map(u => {
                if (u._index === this._index) {
                    return { ...this }; // Atualiza o item existente
                }
                return u;
            });
        } else {
            this._index = this.getNewIndex();
            list.push(this);
        }
    
        localStorage.setItem("tasks", JSON.stringify(list));
    }
    

    getNewIndex(){ //each list gets an id to help when it needs to search

        let listIndex = parseInt(localStorage.getItem("listIndex"));

        if(!listIndex > 0) listIndex = 0;

        listIndex++;

        localStorage.setItem("listIndex", listIndex);

        return listIndex;

    }

    remove(){ //remove a list

        let list = List.getListStorage();

        list.forEach((listData, index)=>{

            if(this._index == listData._index){

                list.splice(index, 1);

            }

        });
        localStorage.setItem("tasks", JSON.stringify(list));

    }

}
