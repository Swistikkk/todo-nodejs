let todoList = [];

function getTodoList() {
    fetch('/todo', { method: 'GET' })
        .then(response => response.json())
        .then(answer => todoList = answer.todoList);

    console.log(todoList);
}

getTodoList();