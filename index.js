document.addEventListener("DOMContentLoaded", function(){
  let script = new Script(
    "todo-form",
    "todo-input",
    "todo-list",
    "edit-form",
    "edit-input",
    "cancel-edit-btn"
  );
  
  script.submitTodo();
  script.actions();
  script.cancelEdit();
  script.submitEditForm();
});
