const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var port = 3000;
var sql = require("./db");
const CRUD_operations = require("./CRUD_functions"); 

// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
// simple route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"Project_Part_B_209543719/HomePage.html"));
});
// set port, listen for requests
app.listen(port, () => {
    console.log("Server is running on port 3000.");
});

app.post("/newCustomer", CRUD_operations.createNewCustomer);