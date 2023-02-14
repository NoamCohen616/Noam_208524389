var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');

const createDb = (req, res) => {
    CreateSchema(req, res);
    UseSchema(req, res);
    CreateUsersTable(req, res); 
    CreateNonAtomicObjectsTable(req, res); 
    CreateSpacesTable(req, res);
    CreateSharedSpacesTable(req, res); 
    CreateNonAtomicInNonAtomicTable(req, res); 
    CreateAtomicObjectsTable(req, res); 
    CreateStockObjectsTable(req, res); 
    CreateAlertsTable(req, res);
    CreateSharingRequestsTable(req, res);
    CreateObjectStatusUpdatesTable(req, res);

    console.log('All tables created successfully!');
    res.status(200).send({ message: 'All tables created successfully!'});
}

const insertData = (req, res) => {
    InsertDataIntoUsers(req, res); 
    InsertDataIntoNonAtomicObjects(req, res); 
    InsertDataIntoSpaces(req, res); 
    InsertDataIntoSharedSpaces(req, res); 
    InsertDataIntoNonAtomicInNonAtomic(req, res); 
    InsertDataIntoAtomicObjects(req, res); 
    InsertDataIntoStockObjects(req, res); 
    InsertDataIntoAlerts(req, res); 
    InsertDataIntoSharingRequests(req, res); 
    InsertDataIntoObjectStatusUpdates(req, res); 

    console.log('All data inserted successfully!');
    res.status(200).send({ message: 'All data inserted successfully!'});
}

const dropDb = (req, res)=> {
    var q = "DROP DATABASE web;";
        SQL.query(q, (err, mysqlres) => {
            if (err) {
                console.log("error in dropping web schema", err);
                res.status(500).send({message: "error in dropping web schema"});
            }
            else {
                console.log("dropped web schema sucssefully");
                CreateSchema(req, res);
                res.status(200).send({ message: "dropped and created web schema sucssefully"});
            }
        });
    return;
}

const CreateSchema = (req, res) => {
    var q = "CREATE DATABASE IF NOT EXISTS web;";
        SQL.query(q, (err, mysqlres) => {
            if (err) {
                console.log("error in creating web schema", err);
            }
            else {
                console.log("created web schema sucssefully");
            }
        });
    return;
}

const UseSchema = (req, res) => {
    var q = "USE web;";
        SQL.query(q, (err, mysqlres) => {
            if (err) {
                console.log("error in using web schema", err);
            }
            else {
                console.log("using web schema sucssefully");
            }
        });
    return;
}

//CREATE users TABLE
const CreateUsersTable = (req, res) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `users` (\n"
        + "email varchar(255) NOT NULL PRIMARY KEY,\n"
        + "password varchar(255) NOT NULL,\n"
        + "name varchar(255) NOT NULL,\n"
        + "lastVisit datetime DEFAULT CURRENT_TIMESTAMP NULL\n"
        + ")";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating users table" });
            return;
        }
        console.log('created users table');
    })
    return;
}

//CREATE nonAtomicObjects TABLE
const CreateNonAtomicObjectsTable = (req, res) => {
    var Q2 = "CREATE TABLE IF NOT EXISTS `nonAtomicObjects` (\n"
        + "ID varchar(50) NOT NULL PRIMARY KEY,\n"
        + "owner varchar(255) NOT NULL,\n"
        + "lastUpdate datetime DEFAULT CURRENT_TIMESTAMP NULL,\n"
        + "name varchar(255) NOT NULL,\n"
        + "isPersonal BOOLEAN NOT NULL\n"
        + ")";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating nonAtomicObjects table" });
            return;
        }
        console.log('created nonAtomicObjects table');
    })
    return;
}

//CREATE spaces TABLE
const CreateSpacesTable = (req, res) => {
    var Q3 = "CREATE TABLE IF NOT EXISTS `spaces` (\n"
        + "ID varchar(50) NOT NULL PRIMARY KEY\n"
        + ")";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating spaces table" });
            return;
        }
        console.log('created spaces table');
    })
    return;
}

//CREATE sharedSpaces TABLE
const CreateSharedSpacesTable = (req, res) => {
    var Q4 = "CREATE TABLE IF NOT EXISTS `sharedSpaces` (\n"
        + "space varchar(50) NOT NULL,\n"
        + "sharedWith varchar(255) NOT NULL,\n"
        + "PRIMARY KEY (space, sharedWith)\n"
        + ")";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating sharedSpaces table" });
            return;
        }
        console.log('created sharedSpaces table');
    })
    return;
}

//CREATE nonAtomicInNonAtomic TABLE
const CreateNonAtomicInNonAtomicTable = (req, res) => {
    var Q5 = "CREATE TABLE IF NOT EXISTS `nonAtomicInNonAtomic` (\n"
        + "ID varchar(50) NOT NULL,\n"
        + "inside varchar(50) NOT NULL,\n"
        + "PRIMARY KEY (ID, inside)\n"
        + ")";
    SQL.query(Q5, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating nonAtomicInNonAtomic table" });
            return;
        }
        console.log('created nonAtomicInNonAtomic table');
    })
    return;
}

//CREATE atomicObjects TABLE
const CreateAtomicObjectsTable = (req, res) => {
    var Q6 = "CREATE TABLE IF NOT EXISTS `atomicObjects` (\n"
        + "ID varchar(50) NOT NULL PRIMARY KEY,\n"
        + "owner varchar(255) NOT NULL,\n"
        + "lastUpdate datetime DEFAULT CURRENT_TIMESTAMP NULL,\n"
        + "name varchar(255) NOT NULL,\n"
        + "isPersonal BOOLEAN NOT NULL,\n"
        + "inside varchar(50) NOT NULL\n"
        + ")";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating atomicObjects table" });
            return;
        }
        console.log('created atomicObjects table');
    })
    return;
}

//CREATE stockObjects TABLE
const CreateStockObjectsTable = (req, res) => {
    var Q7 = "CREATE TABLE IF NOT EXISTS `stockObjects` (\n"
        + "ID varchar(50) NOT NULL PRIMARY KEY,\n"
        + "stockStatus varchar(50) NOT NULL\n"
        + ")";
    SQL.query(Q7, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating stockObjects table" });
            return;
        }
        console.log('created stockObjects table');
    })
    return;
}

//CREATE alerts TABLE
const CreateAlertsTable = (req, res) => {
    var Q8 = "CREATE TABLE IF NOT EXISTS `alerts` (\n"
        + "user varchar(255) NOT NULL,\n"
        + "number int(10) NOT NULL,\n"
        + "time datetime DEFAULT CURRENT_TIMESTAMP NULL,\n"
        + "title varchar(50) NOT NULL,\n"
        + "message varchar(255) NOT NULL,\n"
        + "`read` BOOLEAN NOT NULL,\n"
        + "deleted BOOLEAN NOT NULL,\n"
        + "PRIMARY KEY (user, number)\n"
        + ")";
    SQL.query(Q8, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating alerts table" });
            return;
        }
        console.log('created alerts table');
    })
    return;
}

//CREATE sharingRequests TABLE
const CreateSharingRequestsTable = (req, res) => {
    var Q9 = "CREATE TABLE IF NOT EXISTS `sharingRequests` (\n"
        + "user varchar(255) NOT NULL,\n"
        + "number int(10) NOT NULL,\n"
        + "fromUser varchar(255) NOT NULL,\n"
        + "space varchar(50) NOT NULL,\n"
        + "requestStatus varchar(50) NOT NULL,\n"
        + "PRIMARY KEY (user, number)\n"
        + ")";
    SQL.query(Q9, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating sharingRequests table" });
            return;
        }
        console.log('created sharingRequests table');
    })
    return;
}

//CREATE objectStatusUpdates TABLE
const CreateObjectStatusUpdatesTable = (req, res) => {
    var Q10 = "CREATE TABLE IF NOT EXISTS `objectStatusUpdates` (\n"
        + "user varchar(255) NOT NULL,\n"
        + "number int(10) NOT NULL,\n"
        + "byUser varchar(255) NOT NULL,\n"
        + "stockObject varchar(50) NOT NULL,\n"
        + "PRIMARY KEY (user, number)\n"
        + ")";
    SQL.query(Q10, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating objectStatusUpdates table" });
            return;
        }
        console.log('created objectStatusUpdates table');
        return;
    })
}

//Insert DATA into users table
const InsertDataIntoUsers = (req, res) => {
    var Q11 = "INSERT INTO users SET ?";
    const csvFilePath = path.join(__dirname, "users.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "email": element.email,
                    "password": element.password,
                    "name": element.name,
                    "lastVisit": element.lastVisit
                }
                SQL.query(Q11, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into users", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into users");
return;
};

//Insert DATA into nonAtomicObjects table
const InsertDataIntoNonAtomicObjects = (req, res) => {
    var Q12 = "INSERT INTO nonAtomicObjects SET ?";
    const csvFilePath = path.join(__dirname, "nonAtomicObjects.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ID": element.ID,
                    "owner": element.owner,
                    "name": element.name,
                    "isPersonal": element.isPersonal
                }
                SQL.query(Q12, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into nonAtomicObjects", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into nonAtomicObjects");
return;
};

//Insert DATA into spaces table
const InsertDataIntoSpaces = (req, res) => {
    var Q13 = "INSERT INTO spaces SET ?";
    const csvFilePath = path.join(__dirname, "spaces.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ID": element.ID,
                }
                SQL.query(Q13, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into spaces", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into spaces");
return;
};

//Insert DATA into sharedSpaces table
const InsertDataIntoSharedSpaces = (req, res) => {
    var Q14 = "INSERT INTO sharedSpaces SET ?";
    const csvFilePath = path.join(__dirname, "sharedSpaces.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "space": element.space,
                    "sharedWith": element.sharedWith
                }
                SQL.query(Q14, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into sharedSpaces", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into sharedSpaces");
return;
};

//Insert DATA into nonAtomicInNonAtomic table
const InsertDataIntoNonAtomicInNonAtomic = (req, res) => {
    var Q15 = "INSERT INTO nonAtomicInNonAtomic SET ?";
    const csvFilePath = path.join(__dirname, "nonAtomicInNonAtomic.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ID": element.ID,
                    "inside": element.inside
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into nonAtomicInNonAtomic", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into nonAtomicInNonAtomic");
return;
};

//Insert DATA into atomicObjects table
const InsertDataIntoAtomicObjects = (req, res) => {
    var Q15 = "INSERT INTO atomicObjects SET ?";
    const csvFilePath = path.join(__dirname, "atomicObjects.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ID": element.ID,
                    "owner": element.owner,
                    "name": element.name,
                    "isPersonal": element.isPersonal,
                    "inside": element.inside,
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into atomicObjects", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into atomicObjects");
return;
};

//Insert DATA into stockObjects table
const InsertDataIntoStockObjects = (req, res) => {
    var Q15 = "INSERT INTO stockObjects SET ?";
    const csvFilePath = path.join(__dirname, "stockObjects.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ID": element.ID,
                    "stockStatus": element.stockStatus
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into stockObjects", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into stockObjects");
return;
};

//Insert DATA into alerts table
const InsertDataIntoAlerts = (req, res) => {
    var Q15 = "INSERT INTO alerts SET ?";
    const csvFilePath = path.join(__dirname, "alerts.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "user": element.user,
                    "number": element.number,
                    "title": element.title,
                    "message": element.message,
                    "read": element.read,
                    "deleted": element.deleted,
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into alerts", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into alerts");
return;
};

//Insert DATA into sharingRequests table
const InsertDataIntoSharingRequests = (req, res) => {
    var Q15 = "INSERT INTO sharingRequests SET ?";
    const csvFilePath = path.join(__dirname, "sharingRequests.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "user": element.user,
                    "number": element.number,
                    "fromUser": element.fromUser,
                    "space": element.space,
                    "requestStatus": element.requestStatus,
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into sharingRequests", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into sharingRequests");
return;
};

//Insert DATA into objectStatusUpdates table
const InsertDataIntoObjectStatusUpdates = (req, res) => {
    var Q15 = "INSERT INTO objectStatusUpdates SET ?";
    const csvFilePath = path.join(__dirname, "objectStatusUpdates.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "user": element.user,
                    "number": element.number,
                    "byUser": element.byUser,
                    "stockObject": element.stockObject,
                }
                SQL.query(Q15, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data into objectStatusUpdates", err);
                    }
                    console.log("created row sucssefully");
                });
            });
        });
    console.log("data inserted into objectStatusUpdates");
return;
};

module.exports = {
    createDb, insertData, dropDb
}