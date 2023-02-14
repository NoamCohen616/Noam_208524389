const connection = require("./db/db");

exports.login = (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM web.users WHERE `email` = '" + email + "' AND `password` = '" + password + "' LIMIT 1",
    function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({
                response: JSON.parse(JSON.stringify(data[0])),
            });
        }
    });
};

exports.register = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.users(password, name, email) VALUES ('${req.body.password}', '${req.body.name}', '${req.body.email}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ data });
                }
            }
        );
    }
};

exports.getUsers = (req, res) => {
    connection.query(
        "SELECT * FROM web.users",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getNonAtomicObjects = (req, res) => {
    connection.query(
        "SELECT * FROM web.nonAtomicObjects",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createNonAtomicObject = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.nonAtomicObjects(name, ID, owner, isPersonal) VALUES ('${req.body.name}', '${req.body.ID}', '${req.body.owner}', '${req.body.isPersonal}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ data });
                }
            }
        );
    }
};

exports.updateNonAtomicObject = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `UPDATE web.nonAtomicObjects SET name ='${req.body.name}' , owner ='${req.body.owner}' , isPersonal = '${req.body.isPersonal}' WHERE ID = '${req.body.ID}'`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ data });
                }
            }
        );
    }
};

exports.getSpaces = (req, res) => {
    connection.query(
        "SELECT ns.* FROM web.spaces as s JOIN web.nonAtomicObjects as ns on s.ID = ns.ID",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createSpace = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.spaces(ID) VALUES ('${req.body.ID}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else if (req.body.isPersonal) {
                    res.status(201).json({ data });
                } else if (!req.body.isPersonal) {
                    connection.query(
                        `INSERT INTO web.sharedSpaces(space, sharedWith) VALUES ('${req.body.ID}', '${req.body.owner}')`,
                        function (err, data, fields) {
                            if (err) {
                                res.status(500).json({ error: err.message });
                            } else {
                                res.status(201).json({ data });
                            }
                        }
                    );
                }
            }
        );
    }
};

exports.getSharedSpaces = (req, res) => {
    connection.query(
        "SELECT * FROM web.sharedSpaces",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getNonAtomicInNonAtomic = (req, res) => {
    connection.query(
        "SELECT * FROM web.nonAtomicInNonAtomic",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createNonAtomicInNonAtomic = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.nonAtomicInNonAtomic(ID, inside) VALUES ('${req.body.ID}', '${req.body.inside}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ data });
                }
            }
        );
    }
};

exports.updateNonAtomicInNonAtomic = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `UPDATE web.nonAtomicInNonAtomic SET inside = '${req.body.inside}' WHERE ID = '${req.body.ID}'`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ data });
                }
            }
        );
    }
};

exports.getAtomicObjects = (req, res) => {
    connection.query(
        "SELECT * FROM web.atomicObjects",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createAtomicObject = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.atomicObjects(name, ID, owner, isPersonal, inside) VALUES ('${req.body.name}', '${req.body.ID}', '${req.body.owner}', '${req.body.isPersonal}', '${req.body.inside}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ data });
                }
            }
        );
    }
};

exports.updateAtomicObject = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `UPDATE web.atomicObjects SET name = '${req.body.name}', owner='${req.body.owner}', isPersonal='${req.body.isPersonal}', inside='${req.body.inside}' WHERE ID = '${req.body.ID}'`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ data });
                }
            }
        );
    }
};

exports.getStockObjects = (req, res) => {
    connection.query(
        "SELECT * FROM web.stockObjects",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.createStockObject = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        connection.query(
            `INSERT INTO web.stockObjects(ID, stockStatus) VALUES ('${req.body.ID}', '${req.body.stockStatus}')`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ data });
                }
            }
        );
    }
};

exports.getAlerts = (req, res) => {
    connection.query(
        "SELECT * FROM web.alerts",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getSharingRequests = (req, res) => {
    connection.query(
        "SELECT * FROM web.sharingRequests",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getObjectStatusUpdates = (req, res) => {
    connection.query(
        "SELECT * FROM web.objectStatusUpdates",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};