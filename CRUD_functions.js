const sql = require("./db.js");
var path = require("path");

const createNewCustomer = function(req,res){
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = currentdate.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    var hh = currentdate.getHours();
    var mi = currentdate.getMinutes();
    var ss = currentdate.getSeconds();
    currentdate = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;

// Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const newCustomer = {
        "email": req.body.email,
        "password": req.body.check-Password,
        "uploadedOn": currentdate
    };
    sql.query("INSERT INTO Users SET ?", newCustomer, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return;
        }
        console.log("created customer: ", { id: mysqlres.insertId, ...newCustomer });
        res.send({message:"new customer created successfully"});
        return;
    });
};
module.exports = {createNewCustomer};
// Create a new Customer