//import
const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const sql = require('./db/db');
const CRUD_operations = require("./db/CRUD_functions"); 
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const CreateDB = require('./db/createDB');

//setup
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');
//app.use(express.static('static'));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "public")));

//routs
app.get('/' , (req, res)=>{
    res.redirect('HomePage');
    //res.render('ReadDoctorsData');
});
//ReadDoctorsData
app.get('/HomePage' , (req, res)=>{
    res.render('HomePage');
});
//app.get('/AboutUs' , (req, res)=>{
//    res.render('AboutUs');
//});
app.get('/SignUp' , (req, res)=>{
    res.render('SignUp');
});
app.get('/Search' , (req, res)=>{
    res.render('Search');
});
app.get('/Founded' , (req, res)=>{
    res.render('Founded');
});

app.get('/AboutUs' , CreateDB.insertAbout);


//listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});

//get and post
app.post("/newCustomer", CRUD_operations.createNewCustomer);
app.get("/findCustomer", CRUD_operations.findCustomer);
app.get("/findDoctors", CRUD_operations.findDoctors);

//creare DB tables
app.get('/CreateDoctorsTable',CreateDB.CreateDoctorsTable);
app.get('/CreateUsersTable',CreateDB.CreateUsersTable);
app.get('/CreateSearchesTable',CreateDB.CreateSearchesTable);

//insert into DB tables
app.get("/InsertDoctorsData", CreateDB.InsertDataToDoctors);
app.get("/InsertDataToUsers", CreateDB.InsertDataToUsers);
app.get("/InsertDataToSearches", CreateDB.InsertDataToSearches);

//show DB tables
app.get("/ShowTableDoctors", CreateDB.ShowTableDoctors);
app.get("/ShowTableSearches", CreateDB.ShowTableSearches);
app.get("/ShowTableUsers", CreateDB.ShowTableUsers);

//drop DB tables
app.get('/dropDoctorsData', CreateDB.DropTableDoctors);
app.get('/DropTableSearches', CreateDB.DropTableSearches);
app.get('/DropTableUsers', CreateDB.DropTableUsers);


//app.get('/CreateofficeHoursTable',CreateDB.CreateofficeHoursTable);
//app.get("/InsertOfficeHoursData", CreateDB.InsertDataToOfficeHours);
//app.get("/ShowTableofficeHours", CreateDB.ShowTableofficeHours);
//app.get('/dropOfficeHoursData', CreateDB.DropTableofficeHours);