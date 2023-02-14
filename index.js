const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CreateDB = require('./db/CreateDB');
const route = require("./route");
const port = 3000;

//setups
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/views"));
app.use("/views", express.static(__dirname + "views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/css", express.static(__dirname + "/static/css"));
app.use("/img", express.static(__dirname + "/static/img"));
app.use("/js", express.static(__dirname + "/static/js"));

//routes for DB
//create tables
app.get('/CreateDb', CreateDB.createDb);

//insert DATA into tables
app.get("/InsertData", CreateDB.insertData);

app.get("/dropDb", CreateDB.dropDb);

//route for home page
app.get('/', (req, res) =>{
    res.redirect('/home');
});
app.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/index.html"));
});
//create new account route
app.get('/create_new_account', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/create_new_account.html"));
});
//personal area route
app.get('/personal_area', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/personal_area.html"));
});
//choose space route
app.get('/choose_space', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/choose_space.html"));
});
//supply manage route
app.get('/supply_manage', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/supply_manage.html"));
});
//edit account route
app.get('/edit_account', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/edit_account.html"));
});
//non atomic zone route
app.get('/non_atomic_zone', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/non_atomic_zone.html"));
});
//object details
app.get('/object_details', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/object_details.html"));
});

app.use(route);

//listen
app.listen(port, () =>{
    console.log("server is running on port ", port);
})