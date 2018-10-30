const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
let todoList = [{ id: 1, todo: "Write book" }];

fs.readFile('todolist.json', (err, data) => {
   if(err) console.log(err);

   todoList = JSON.parse(data.toString());
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/todo', (req, res) => {
    fs.readFile('todolist.json', (err, data) => {
        let json = JSON.parse(data.toString());
        json.push({id: json.length + 1, todo: req.body.todo});

        fs.writeFile('todolist.json', JSON.stringify(json), err => {
            res.json({ success: true, todoList: json});
        });
    });
});

app.get('/todo', (req, res) => {
    res.json({ todoList: todoList })
});

app.post('/todo/delete', (req, res) => {
    if(req.body.todoItems.length > 0) {
        fs.readFile('todolist.json', (err, data) => {
            let json = JSON.parse(data.toString()).filter(todo => !req.body.todoItems.some(el => el === todo.id));

            fs.writeFile('todolist.json', JSON.stringify(json), err => {
                console.log(err);
            });
        })
    }
    res.json({ success: true });
});

app.listen(port);