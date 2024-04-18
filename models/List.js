class List{
    constructor(value){
        this._value = value;
        this._index;
    }

    getValue(){
        return this._value;
    }

    setValue(value){
        return this._value = value;
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

    saveStorage(){ //save a list
        
        let list = List.getListStorage();

        if(this.index > 0){

            list.map(u=>{

                if(u._index == this.index){

                    Object.assign(u, this);

                }
                
                return u;

            });
        
        }else{

            this.index = this.getNewIndex();
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