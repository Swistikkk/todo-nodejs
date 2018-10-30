import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
            todo: null
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.addTodo = this.addTodo.bind(this);
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

        this.setState({
            todoList: [...this.state.todoList, { todo }]
        });

        fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: todo
            })
        })
    }

    onChangeText(e) {
        this.setState({
            todo: e.target.value
        })
    }

    render() {
        const { todoList } = this.state;

        return (
            <div className="app-wrapper">
                <List>
                    {
                        todoList.map(el => {
                            return (
                                <ListItem>
                                    <Checkbox
                                        checked={false}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                    <ListItemText primary={el.todo} />
                                </ListItem>
                            )
                        })
                    }
                </List>

                <div className="todo-form">
                    <TextField
                        placeholder="What`s need to do?"
                        fullWidth={true}
                        onChange={this.onChangeText}
                    />

                    <div className="todo-button">
                        <Button color="primary" variant="contained" onClick={this.addTodo}>Let's do it!</Button>
                    </div>
                </div>
            </div>
        )
    }
}