//selectors..

const todoInput = document.querySelector('.todo_input');
const todoDate = document.querySelector('.todo_date');
const todoDescription = document.querySelector('.todo_description');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');

//Event listen...
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO STORAGE
    saveSessionTodos(todoInput.value);

    const newTodoDescription = document.createElement('p');
    newTodoDescription.innerText = todoDescription.value;
    newTodoDescription.classList.add('todo-description');
    todoDiv.appendChild(newTodoDescription);

    const newTodoDate = document.createElement('p');
    newTodoDate.innerText = todoDate.value;
    newTodoDate.classList.add('todo-deadline');
    todoDiv.appendChild(newTodoDate);

    //check
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked_btn");
    todoDiv.appendChild(checkedButton);
    //Delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete_btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    //clear todo 
    todoInput.value = "";
    todoDate.value = "";
    todoDescription.value = "";
}

function deleteCheck() {
    const item = event.target;
    //delete todo
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        removeSessionTodos(todo);
        todo.remove();
    }
    //checkmark
    if (item.classList[0] === "checked_btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function saveSessionTodos(todo) {
    let todos;
    if (sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    todos.push(todo);
    sessionStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TODO TO STORAGE
        saveSessionTodos(todoInput.value);

        //check
        const checkedButton = document.createElement('button');
        checkedButton.innerHTML = '<i class="fas fa-check"></i>';
        checkedButton.classList.add("checked_btn");
        todoDiv.appendChild(checkedButton);
        //Delete
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete_btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeSessionTodos(todo) {
    let todos;
    if (sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    sessionStorage.setItem("todos", JSON.stringify(todos));
}


