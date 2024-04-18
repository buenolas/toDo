class Script {
    constructor(todoForm, todoInput, todoList, editForm, editInput, cancelEditBtn) {
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

    saveTodo (text) {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        const todoTitle = document.createElement("h3");
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);
        
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check-double"></i>';
        todo.appendChild(doneBtn);
        
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn);
        
        const deleteBtn = document.createElement("button");
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

    updateTodo = (text) => {
        const todos = document.querySelectorAll(".todo");
        todos.forEach((todo)=>{
            let todoTitle = todo.querySelector("h3");
            if(todoTitle.innerText === this.oldInputValue){
                todoTitle.innerText = text;
                let list = new List();
                list.saveStorage();
            }
        });

    }

    submitTodo() {
        //let list = {};
        this.todoForm.addEventListener("submit", e=>{
            e.preventDefault();
            const inputValue = this.todoInput.value;
            if(inputValue){
            
                const newList = new List(inputValue);
                
                newList.saveStorage();

                this.saveTodo(inputValue);
            }
        });
    }

    actions() {
        let list = new List();
        document.addEventListener("click", (e)=>{
            const targetEl = e.target;
            const parentEl = targetEl.closest("div");
            let todoTitle;
            if(parentEl && parentEl.querySelector("h3")){
                todoTitle = parentEl.querySelector("h3").innerText;
            }
            if(targetEl.classList.contains("finish-todo")){
                parentEl.classList.toggle("done");
            }
            if(targetEl.classList.contains("delete-todo")){
                parentEl.remove();
                list.remove();
            }
            if(targetEl.classList.contains("edit-todo")){
                this.toggleForms();
                this.editInput.value = todoTitle
                this.oldInputValue = todoTitle
            }
        });
    }

    cancelEdit() {
        this.cancelEditBtn.addEventListener("click", e=>{
            e.preventDefault();
            this.toggleForms();
        });
    }

    submitEditForm() {
        this.editForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            const editInputValue = this.editInput.value
            if(editInputValue){
                this.updateTodo(editInputValue);
            }
            this.toggleForms();
        });
    }

    selectAll(){ // gets all lists in the storage and show them when the page refreshes
        
        const lists = List.getListStorage();

        lists.forEach(dataList=>{

            const list = new List();

            list.loadFromJSON(dataList);

            this.saveTodo(list.getValue());

        });

    }
}
