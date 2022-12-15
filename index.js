
//? JSON.stringify(value, replacer, space);
// - value is JS object
// - replcer is uesd to filter values in your object
// - space is used to print js pretty.

const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const cors = require('cors');
let corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);



//localhost:8080/users/signup

app.set("secretKey", "oct21NodeApp");
const todoArr = [
    {id: 1, name: "Todo1"},
    {id: 2, name: "Todo2"},
];

// app.get("/getTodos", (req, res) =>{
//     return res.json({todos: todoArr, message : "Todos fetched successfully!"});
// })

// app.post("/createTodo", (req, res) =>{
//     console.log(req.body);
//     todoArr.push(req.body);
//     return res.json({message: "Todo created successfully!"});
// })

// app.put("/updateTodo", (req,res)=>{
//     console.log(req.body);
//     const todoId = req.body.tobeUpdatedId;

//     const todoIndex = todoArr.findIndex(elem => elem.id === todoId);
//     todoArr[todoIndex] = {id : req.body.id, name: req.body.name};
//     console.log(todoArr)
//     return res.json({message: "Todo updated successfully!"});

// });
// app.delete("/deleteTodo", (req, res)=>{  
//     const todoId = req.body.tobeDeletedId;
//     const todoIndex = todoArr.findIndex(elem => elem.id === todoId);
//     todoArr.splice(todoIndex, 1);
//     return res.json({message: "Todo deleted successfully"});
// });

// app.get('/getTodoById', (req, res)=>{
//     // console.log(`params --> `,req.params);
//     // console.log(`query --> `,req.query);
//     const todoId = req.body.id;

//     const todo = todoArr.find(todo => todo.id == todoId);
//     console.log(todo);
//     return res.json({todo: todo, message:"Todo fetched successfully"});
// });

app.get("/", (req, res)=>{
    res.send('Hey Node surver running');
});

app.listen(port, ()=>{
    console.log('Server Successfully running!!');
});