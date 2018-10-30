import React from 'react';
import List from '@material-ui/core/List';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import TodoItem from './TodoItem.jsx';

export default class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
            todo: '',
            done: [],
            textField: null,
            tasksToDelete: []
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/todo', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then(response => response.json())
            .then(response => this.setState({
                todoList: response.todoList
            }))
    }

    addTodo() {
        const { todo } = this.state;

        fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: todo
            })
        })
            .then(response => response.json())
            .then(response => this.setState({
                todoList: response.todoList,
                todo: ''
            }));
    }

    onChangeText(e) {
        this.setState({
            todo: e.target.value
        })
    }

    deleteTask(id) {
        const isAllReadyDelete = this.state.tasksToDelete.find(el => el === id);

        if(isAllReadyDelete) {
            this.setState({
                tasksToDelete: this.state.tasksToDelete.filter(el => el !== id)
            });
        } else {
            this.setState({
                tasksToDelete: [...this.state.tasksToDelete, id]
            });
        }
    }

    saveButton() {
        const { tasksToDelete, todoList } = this.state;

        fetch('http://localhost:3000/todo/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todoItems: tasksToDelete
            })
        });

        this.setState({
            todoList: todoList.filter(item => !tasksToDelete.some(el => el === item.id)),
            tasksToDelete: []
        });
    }

    onEnter(e) {
        if(e.key === 'Enter') {
            this.addTodo();
        }
    }

    render() {
        const { todoList, todo, tasksToDelete } = this.state;

        return (
            <div className="app-wrapper">
                <h2 className="todo-title">My Tasks</h2>

                <List>
                    {
                        todoList.map(el => {
                            return (
                                <TodoItem key={el.id} {...el} delete={this.deleteTask}/>
                            )
                        })
                    }
                </List>

                <div className="todo-form">
                    <TextField
                        placeholder="What`s need to do?"
                        fullWidth={true}
                        onChange={this.onChangeText}
                        value={todo}
                        onKeyPress={this.onEnter}
                    />

                    <div className="todo-button">
                        <Button color="primary" variant="contained" onClick={this.addTodo}>Add task</Button>
                    </div>

                    {tasksToDelete.length > 0 && <div className="todo-button todo-button__delete">
                        <Button color="secondary" variant="contained" onClick={this.saveButton}>Delete done tasks</Button>
                    </div>}
                </div>
            </div>
        )
    }
}