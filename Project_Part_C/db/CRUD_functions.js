const sql = require("./db.js");
var path = require("path");
const e = require("express");
var url = require('url');
const JSFunc = require('./funcs');

// Create a new Customer
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

    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const newCustomer = {
        "email": req.body.email,
        "password": req.body.password,
        "uploadedOn": currentdate
    };
    console.log(newCustomer);

    sql.query("SELECT email FROM Users WHERE email like ?" , newCustomer.email , (err, results) => {
        if (err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return;
        }
        if (results.length != 0){ //found the customer in the db- this user is already exist
            res.render('SignUp', {userExist: "This user is already exist in the system"});
        }
        else{
            sql.query("INSERT INTO Users SET ?", newCustomer, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({message: "error in creating customer: " + err});
                    return;
                }
                console.log("new customer created successfully");
                res.render("HomePage");
                return;
            });
        }
    });
};


//find customer
const findCustomer = function(req,res){
    const {email, password} = req.query;
console.log(email, password);
    sql.query(`SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'` , (err, result) => {
        console.log("results", result);
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting customer by name: " + err});
            return;
        }
        if (result.length != 0){// found the customer
            res.render("Search" , {signInEmail: req.query.email});
            return;
        }
        res.render('HomePage', {userNotExist: "The user is not exist in the system"}); //if the user is not on the system
        return;
    });
}

//find doctors
const findDoctors = function(req,res){
    //step 1 - insert the search details into Searches table
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

    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    const newSearch = {
        "userEmail": req.query.signInEmail,
        "serviceType": req.query.serviceTypes,
        "country": null,
        "city": null,
        "latitude": null,
        "longtitide": null,
        "radius": null,
        "uploadedOn": currentdate
    };

    if (req.query.country == null){ //use geo-location
        newSearch.latitude = req.query.latitude; 
        newSearch.longtitide = req.query.longtitide;
        newSearch.radius = req.query.radiusInput;
    }
    else{//use county and city
        newSearch.country = req.query.country;
        newSearch.city = req.query.city;
    }
    console.log(newSearch); 

    //insert the new search details to the db
    sql.query("INSERT INTO Searches SET ?", newSearch, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating Search object: " + err});
            return;
        }
        console.log("new Search added to db");
        //res.render("Founded");
        return;
    });

    
    //step 2 - find the relevant doctors

    if (req.query.country == null){ //use geo-location

        sql.query('SELECT * FROM Doctors WHERE medicalSpeciality = ?', req.query.serviceTypes, function(error, results, fields) {
            if (error) throw error;
			if (results.length > 0) { //if there is doctors with the sane service type was asked
                results.forEach((bs, index) => {
                    bs.distance = JSFunc.getDistanceFromLatLonInKm(req.query.latitude, req.query.longtitide, bs.latitude, bs.longtitide);
                });
                let radius = req.query.radiusInput;
                results = results.filter(element => element.distance < radius)
                if (results.length == 0) { 
                    res.render("notFound");
                }
                else { //If there is relevant doctors exists
                    res.render('Founded1', {pple: results});
                }
			} 
            else {
				res.render("notFound");
			}			
			res.end();
		});
    }

    else{ //use county and city
        console.log(req.query.city);
        console.log(req.query.country);
        sql.query('SELECT * FROM Doctors WHERE city = ? AND country = ? AND medicalSpeciality = ?', [req.query.city, req.query.country, req.query.serviceTypes], function(error, results, fields) {
            if (error) throw error;
			if (results.length > 0) { // If there is relevant doctors exists
                res.render('Founded1', {pple: results});
			} 
            else {
                res.render("notFound");
			}			
        });
    }
}


module.exports = {createNewCustomer , findCustomer, findDoctors};
