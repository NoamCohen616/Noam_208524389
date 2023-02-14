-- //create DB
CREATE DATABASE web;

-- //CREATE users TABLE
CREATE TABLE IF NOT EXISTS `users` (
     email varchar(255) NOT NULL PRIMARY KEY,
     password varchar(255) NOT NULL,
     name varchar(255) NOT NULL,
    lastVisit datetime NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE nonAtomicObjects TABLE
CREATE TABLE IF NOT EXISTS `nonAtomicObjects` (
    ID varchar(50) NOT NULL PRIMARY KEY,
    owner varchar(255) NOT NULL,
    lastUpdate datetime NOT NULL,
    -> name varchar(255) NOT NULL,
    -> isPersonal BOOLEAN NOT NULL,
    -> FOREIGN KEY (owner) REFERENCES users(email)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE spaces TABLE
CREATE TABLE IF NOT EXISTS `spaces` (
    -> ID varchar(50) NOT NULL PRIMARY KEY,
    -> FOREIGN KEY (ID) REFERENCES nonAtomicObjects(ID)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE sharedSpaces TABLE
CREATE TABLE IF NOT EXISTS `sharedSpaces` (
    -> space varchar(50) NOT NULL,
    -> sharedWith varchar(255) NOT NULL,
    -> PRIMARY KEY (space, sharedWith),
    -> FOREIGN KEY (space) REFERENCES spaces(ID),
    -> FOREIGN KEY (sharedWith) REFERENCES users(email)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE nonAtomicInNonAtomic TABLE
CREATE TABLE IF NOT EXISTS `nonAtomicInNonAtomic` (
    -> ID varchar(50) NOT NULL,
    -> inside varchar(50) NOT NULL,
    -> PRIMARY KEY (ID, inside),
    -> FOREIGN KEY (ID) REFERENCES nonAtomicObjects(ID),
    -> FOREIGN KEY (inside) REFERENCES nonAtomicObjects(ID)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE atomicObjects TABLE
CREATE TABLE IF NOT EXISTS `atomicObjects` (
    -> ID varchar(50) NOT NULL PRIMARY KEY,
    -> owner varchar(255) NOT NULL,
    -> lastUpdate datetime NOT NULL,
    -> name varchar(255) NOT NULL,
    -> isPersonal BOOLEAN NOT NULL,
    -> inside varchar(50) NOT NULL,
    -> FOREIGN KEY (owner) REFERENCES users(email),
    -> FOREIGN KEY (inside) REFERENCES nonAtomicObjects(ID)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE stockObjects TABLE
CREATE TABLE IF NOT EXISTS `stockObjects` (
     ID varchar(50) NOT NULL PRIMARY KEY,
     stockStatus varchar(50) NOT NULL,
     FOREIGN KEY (ID) REFERENCES atomicObjects(ID)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE alerts TABLE
CREATE TABLE IF NOT EXISTS `alerts` (
     user varchar(255) NOT NULL,
     number int(10) NOT NULL,
     time datetime NOT NULL,
     title varchar(50) NOT NULL,
     message varchar(255) NOT NULL,
     `read` BOOLEAN NOT NULL,
     deleted BOOLEAN NOT NULL,
     PRIMARY KEY (user, number),
     FOREIGN KEY (user) REFERENCES users(email)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE sharingRequests TABLE
CREATE TABLE IF NOT EXISTS `sharingRequests` (
     user varchar(255) NOT NULL,
     number int(10) NOT NULL,
     fromUser varchar(255) NOT NULL,
     space varchar(50) NOT NULL,
     requestStatus varchar(50) NOT NULL,
     PRIMARY KEY (user, number),
     FOREIGN KEY (user, number) REFERENCES alerts(user, number),
     FOREIGN KEY (fromUser) REFERENCES users(email),
     FOREIGN KEY (space) REFERENCES spaces(ID)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- //CREATE objectStatusUpdates TABLE
CREATE TABLE IF NOT EXISTS `objectStatusUpdates` (
    -> user varchar(255) NOT NULL,
    -> number int(10) NOT NULL,
    -> byUser varchar(255) NOT NULL,
    -> stockObject varchar(50) NOT NULL,
    -> PRIMARY KEY (user, number),
    -> FOREIGN KEY (user, number) REFERENCES alerts(user, number),
    -> FOREIGN KEY (byUser) REFERENCES users(email),
    -> FOREIGN KEY (stockObject) REFERENCES stockObjects(ID)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
