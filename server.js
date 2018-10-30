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

// app.get('*', (req, res) => {
//    res.sendFile(__dirname + '/public/index.html');
// });

app.post('/todo', (req, res) => {
    todoList.push[req.body.todo];

    fs.readFile('todolist.json', (err, data) => {
        let json = JSON.parse(data.toString());
        json.push({todo: req.body.todo});

        fs.writeFile('todolist.json', JSON.stringify(json), err => {
            console.log(err);
        });
    });

    res.json({ success: true });
});

app.get('/todo', (req, res) => {
    res.json({ todoList: todoList })
});

app.delete('/todo', (req, res) => {
   res.json({ success: true });
});

app.listen(port);