var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


//create Users table
const CreateUsersTable = (req,res)=> {
    var Q0 = `CREATE TABLE IF NOT EXISTS Users (
        email varchar(255) NOT NULL PRIMARY KEY, 
        password varchar(255) NOT NULL, 
        uploadedOn datetime NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    SQL.query(Q0,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Users table"});
            return;
        }
        console.log('created Users table');
        res.send("Users table created");
        return;
    })      
}


//create Doctors table
const CreateDoctorsTable = (req,res)=> {
    var Q1 = `CREATE TABLE IF NOT EXISTS Doctors (
        email varchar(255) NOT NULL PRIMARY KEY, 
        latitude float NOT NULL,
        longtitide float NOT NULL,
        city varchar(255) NOT NULL,
        country varchar(255) NOT NULL,
        address varchar(255) NOT NULL,
        medicalSpeciality varchar(100) NOT NULL,
        fullName varchar(100) NOT NULL,
        phoneNumber varchar(100) NOT NULL,
        languagesSpoken varchar(100) NOT NULL,
        picture nvarchar(100) NOT NULL,
        averageRate real not null,
        numberOfRating int not null,
        officeHours1 varchar(300) NOT NULL,
        officeHours2 varchar(300) NOT NULL,
        officeHours3 varchar(300) NOT NULL,
        officeHours4 varchar(300) NOT NULL,
        uploadedOn datetime NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Doctors table"});
            return;
        }
        console.log('created Doctors table');
        res.send("Doctors table created");
        return;
    })      
}


//create Searches table
const CreateSearchesTable = (req,res)=> {
    var Q9 = `CREATE TABLE IF NOT EXISTS Searches (
        userEmail varchar(255) NOT NULL,
        serviceType varchar(100) NOT NULL,
        country varchar(100),
        city varchar(100),
        latitude float,
        longtitide float,
        radius int,
        uploadedOn datetime NOT NULL,
        CONSTRAINT PK_Searches PRIMARY KEY (userEmail, uploadedOn),
        FOREIGN KEY (userEmail) REFERENCES Users (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    SQL.query(Q9,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Searches table"});
            return;
        }
        console.log('created Searches table');
        res.send("Searches table created");
        return;
    })      
}


//insert into Doctors table
const InsertDataToDoctors = (req,res)=>{
    var Q3 = "INSERT INTO Doctors SET ?";
    const csvFilePath1= path.join(__dirname, "DoctorsData.csv");
    csv()
    .fromFile(csvFilePath1)
    .then((jsonObj)=>{
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "email": element.email,
                "latitude": element.latitude,
                "longtitide": element.longtitide,
                "city": element.city,
                "country": element.country,
                "address": element.address,
                "medicalSpeciality": element.medicalSpeciality,
                "fullName": element.fullName,
                "phoneNumber": element.phoneNumber,
                "languagesSpoken": element.languagesSpoken,
                "picture": element.picture,
                "averageRate": element.averageRate,
                "numberOfRating": element.numberOfRating,
                "officeHours1": element.officeHours1,
                "officeHours2": element.officeHours2,
                "officeHours3": element.officeHours3,
                "officeHours4": element.officeHours4,
                "uploadedOn": element.year + '/' + element.month + '/' + element.day + ' ' + element.time
            }
            SQL.query(Q3, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting Doctors data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
    })
    res.send("Doctors Data read");

};


//insert into Users table
const InsertDataToUsers = (req,res)=>{
    var Q14 = "INSERT INTO Users SET ?";
    const csvFilePath1= path.join(__dirname, "Users.csv");
    csv()
    .fromFile(csvFilePath1)
    .then((jsonObj)=>{
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "email": element.email,
                "password": element.password,
                "uploadedOn": element.year + '/' + element.month + '/' + element.day + ' ' + element.time
            }
            SQL.query(Q14, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting Users data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
    })
    res.send("Users Data read");
};


//insert into Searches table
const InsertDataToSearches = (req,res)=>{
    var Q15 = "INSERT INTO Searches SET ?";
    const csvFilePath1= path.join(__dirname, "Searches.csv");
    csv()
    .fromFile(csvFilePath1)
    .then((jsonObj)=>{
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "userEmail": element.userEmail,
                "serviceType": element.serviceType,
                "country": element.country,
                "city": element.city,
                "latitude": element.latitude,
                "longtitide": element.longtitide,
                "radius": element.radius,
                "uploadedOn": element.year + '/' + element.month + '/' + element.day + ' ' + element.time
            }
            SQL.query(Q15, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting Searches data", err);
                }
                console.log("created row sucssefuly");
            });
        });
    })
    res.send("Searches Data read");
};


//drop table Doctors
const DropTableDoctors = (req, res)=>{
    var Q6 = "DROP TABLE Doctors";
    SQL.query(Q6, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Doctors table ", err);
            res.status(400).send({message: "error im dropping Doctors table" + err});
            return;
        }
        console.log("Doctors table drpped");
        res.send("Doctors table drpped");
        return;
    })
}


//drop table Searches
const DropTableSearches = (req, res)=>{
    var Q10 = "DROP TABLE Searches";
    SQL.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Searches table ", err);
            res.status(400).send({message: "error im dropping Searches table" + err});
            return;
        }
        console.log("Searches table drpped");
        res.send("Searches table drpped");
        return;
    })
}


//drop table Users
const DropTableUsers = (req, res)=>{
    var Q12 = "DROP TABLE Users";
    SQL.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Users table ", err);
            res.status(400).send({message: "error im dropping Users table" + err});
            return;
        }
        console.log("Users table drpped");
        res.send("Users table drpped");
        return;
    })
}


//show table Doctors
const ShowTableDoctors = (req,res)=>{
    var Q7 = "SELECT * FROM Doctors";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Doctors table ", err);
            res.send("error in showing Doctors table ");
            return;
        }
        console.log("showing Doctors table");
        res.send(mySQLres);
        return;
    })
};


//show table Searches
const ShowTableSearches = (req,res)=>{
    var Q11 = "SELECT * FROM Searches";
    SQL.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Searches table ", err);
            res.send("error in showing Searches table ");
            return;
        }
        console.log("showing Searches table");
        res.send(mySQLres);
        return;
    })
};


//show Users Searches
const ShowTableUsers = (req,res)=>{
    var Q13 = "SELECT * FROM Users";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Users table ", err);
            res.send("error in showing Users table ");
            return;
        }
        console.log("showing Users table");
        res.send(mySQLres);
        return;
    })
};

const insertAbout = (req, res)=>{
    console.log("aaaaaa");
    const csvFilePath = path.join(__dirname, "aboutUsText.csv");
    console.log(csvFilePath);
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        console.log("bbbb");
        console.log(jsonObj);
        res.render('AboutUs.pug', {var1: jsonObj});
    })    
};


module.exports = {CreateDoctorsTable, InsertDataToDoctors, DropTableDoctors, ShowTableDoctors, 
                  CreateSearchesTable, DropTableSearches, ShowTableSearches, CreateUsersTable, 
                DropTableUsers, ShowTableUsers, insertAbout, InsertDataToUsers, InsertDataToSearches};


//create officeHours table
/*const CreateofficeHoursTable = (req,res)=> {
    var Q2 = `CREATE TABLE IF NOT EXISTS officeHours (
        email varchar(255) NOT NULL, 
        day varchar(20) NOT NULL, 
        startTime varchar(20) NOT NULL,
        endTime varchar(20) NOT NULL,
        uploadedOn datetime NOT NULL,
        CONSTRAINT PK_officeHours PRIMARY KEY (email,day,startTime),
        FOREIGN KEY (email) REFERENCES Doctors (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating officeHours table"});
            return;
        }
        console.log('created officeHours table');
        res.send("officeHours table created");
        return;
    })      
}*/


//insert into office hours table
/*const InsertDataToOfficeHours = (req,res)=>{
    var Q4 = "INSERT INTO officeHours SET ?";
    const csvFilePath2= path.join(__dirname, "officeHoursData.csv");
    csv()
    .fromFile(csvFilePath2)
    .then((jsonObj)=>{
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "email": element.email,
                "day": element.day,
                "startTime": element.startTime,
                "endTime": element.endTime,
                "uploadedOn": element.year + '/' + element.month + '/' + element.daynum + ' ' + element.time
            }
            SQL.query(Q4, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting officeHours data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
    })

    res.send("office Hours Data read");
};*/


//drop table officeHours
/*const DropTableofficeHours = (req, res)=>{
    var Q5 = "DROP TABLE officeHours";
    SQL.query(Q5, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping officeHours table ", err);
            res.status(400).send({message: "error im dropping officeHours table" + err});
            return;
        }
        console.log("officeHours table drpped");
        res.send("officeHours table drpped");
        return;
    })
}*/


//show table officeHours
/*const ShowTableofficeHours = (req,res)=>{
    var Q8 = "SELECT * FROM officeHours";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing officeHours table ", err);
            res.send("error in showing officeHours table ");
            return;
        }
        console.log("showing officeHours table");
        res.send(mySQLres);
        return;
    })
};*/