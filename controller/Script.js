class Script {
    constructor(todoForm, todoInput, todoList, editForm, editInput, cancelEditBtn) {
        //get elements
        this.todoForm = document.getElementById(todoForm);
        this.todoInput = document.getElementById(todoInput);
        this.todoList = document.getElementById(todoList);
        this.editForm = document.getElementById(editForm);
        this.editInput = document.getElementById(editInput);
        this.cancelEditBtn = document.getElementById(cancelEditBtn);
        
        this.oldInputValue;
        
        this.id = 0;

        this.selectAll();

    }

    saveTodo (text, buttonState) { //show the new task on the screen
        const todo = document.createElement("div");//create the div which the tasks will show up
        todo.classList.add("todo"); 

        const todoTitle = document.createElement("h3");//the name of the task
        todoTitle.innerText = text;
        todo.appendChild(todoTitle); 
        
        const doneBtn = document.createElement("button");//create the done button
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check-double"></i>';
        if (buttonState) { // Set the button state if provided
            todo.classList.add("done");
        }
        todo.appendChild(doneBtn); 
        
        const editBtn = document.createElement("button");//create the edit button
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn); 
        
        const deleteBtn = document.createElement("button"); //create the delete button
        deleteBtn.classList.add("delete-todo");
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        todo.appendChild(deleteBtn);
        this.todoList.appendChild(todo);
        this.todoInput.value = "";
        this.todoInput.focus();
    }

    toggleForms = () => {
        this.editForm.classList.toggle("hide");
        this.todoForm.classList.toggle("hide");
        this.todoList.classList.toggle("hide");
    }

    updateTodo = (text) => { //update on the screen when a task is edited
        const todos = document.querySelectorAll(".todo");
        todos.forEach((todo)=>{ //run through all tasks 
            
            let todoTitle = todo.querySelector("h3"); //get only the name of the task
            
            if(todoTitle.innerText === this.oldInputValue){ //verify if it is the task we need
                
                todoTitle.innerText = text; //update the name
                
            }
        });

    }

    submitTodo() { //gets the task
        this.todoForm.addEventListener("submit", e=>{
            e.preventDefault();
            
            const inputValue = this.todoInput.value; //gets the value 

            if(inputValue){ //verify if it isnt null
            
                const newList = new List(inputValue);
                
                newList.saveStorage();

                this.saveTodo(inputValue); //show in the screen
            }
        });
    }

    actions() {
        

        document.addEventListener("click", (e)=>{
            const targetEl = e.target;
            const parentEl = targetEl.closest("div");
            

            let todoTitle;
            
            if(parentEl && parentEl.querySelector("h3")){
                todoTitle = parentEl.querySelector("h3").innerText;
            }

            if(targetEl.classList.contains("finish-todo")){ // marks when a task is done
                parentEl.classList.toggle("done");
                
                const taskId = parentEl.getAttribute("data-id"); // Get the task id
                const buttonState = parentEl.classList.contains("done"); // Check if the button is marked as done

                let lists = List.getListStorage();

                lists.forEach((dataList)=>{//search the task on the storage

                    let list = new List();

                    list.loadFromJSON(dataList)
    
                    if (list.getValue() === todoTitle) {//check if we find
                        
                        list.setButton(buttonState);
                        list.saveStorage();
                        
                    }
                });
                

            }

            if(targetEl.classList.contains("delete-todo")){// when click to delete a task
                parentEl.remove();
                
                let removeContent = parentEl.querySelector("h3").innerText; //get the value of the task we want to remove

                let lists = List.getListStorage();

                lists.forEach((dataList)=>{//search the task on the storage

                    let list = new List();

                    list.loadFromJSON(dataList)
    
                    if (list.getValue() === removeContent) {//check if we find
                        
                        list.remove();//remove
                        
                    }
                });
                
                
            }
            
            if(targetEl.classList.contains("edit-todo")){//when click to edit a task
                this.toggleForms();
                this.editInput.value = todoTitle
                this.oldInputValue = todoTitle
            }
        });
    }

    cancelEdit() {//when click to edit but want to cancel it
        this.cancelEditBtn.addEventListener("click", e=>{
            e.preventDefault();
            this.toggleForms();
        });
    }

    submitEditForm() {//submits when a edit is made
        this.editForm.addEventListener("submit", (e)=>{
            e.preventDefault();

            const editInputValue = this.editInput.value //gets the new value
            
            if(editInputValue){//verify if its not empty
            
                this.updateTodo(editInputValue); // update on the screen

                let lists = List.getListStorage();

                lists.forEach((dataList)=>{

                    let list = new List(editInputValue);

                    list.loadFromJSON(dataList)
    
                    if (list.getValue() === this.oldInputValue) {
                        
                        list.setValue(editInputValue);
                        list.saveStorage();
                        
                    }
                });
            }
            
            this.toggleForms();
        });
    }

    selectAll(){ // gets all lists in the storage and show them when the page refreshes
        
        const lists = List.getListStorage();

        lists.forEach(dataList=>{

            const list = new List();

            list.loadFromJSON(dataList);

            this.saveTodo(list.getValue(), list.getButton());

        });

    }
}
