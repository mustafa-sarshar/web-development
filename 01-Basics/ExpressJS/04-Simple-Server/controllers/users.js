const
    { User: Users } = require("../models/User"),
    bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const usersDB = {
    updateUser: function (_id, user_name, email, pwd, first_name, last_name) {
        try {
            const updateUser = Users.findOne({ _id: _id });
            if (updateUser) {
                if (user_name) updateUser.user_name = user_name;
                if (email) updateUser.email = email;
                if (pwd) updateUser.pwd = bcrypt.hashSync(pwd, salt);
                if (first_name) updateUser.first_name = first_name;
                if (last_name) updateUser.last_name = last_name;
                fs.writeFileSync(
                    path.join(__dirname, "..", "models", "users.json"),
                    JSON.stringify(this.users, null, "\t")
                );
                return {
                    code: 202,      // Accepted
                    message: JSON.stringify(updateUser)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    },
    deleteUser: function (_id) {
        try {
            const deleteUser = Users.findOne({ _id: _id });
            if (deleteUser) {
                const usersFiltered = this.users.filter((user) => user._id != _id);
                this.setUsers([...usersFiltered]);
                return {
                    code: 200,      // Accepted
                    message: JSON.stringify(deleteUser)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    },
    getUser: function (_id) {
        try {
            const user = Users.findOne({ _id: _id });
            if (user) {
                return {
                    code: 200,      // Accepted
                    message: JSON.stringify(user)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    }
};

const getAllUsers = (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200)
                .json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send("Error: " + err);
        });
}

const addNewUser = (req, res) => {
    const { user_name, email, pwd, first_name, last_name } = req.body;
    if (user_name && email && pwd) {        
        Users.findOne({ user_name: user_name })
            .then((user) => {
                if (user) {
                    return res.status(409)  // Conflict
                        .send(user_name + "already exists");
                } else {
                    const newUser = {};
                    newUser.user_name = user_name;
                    newUser.email = email;
                    newUser.pwd = bcrypt.hashSync(pwd, salt);
                    newUser.email = email;
                    if (first_name) newUser.first_name = first_name;
                    if (last_name) newUser.last_name = last_name;
                    Users
                        .create(newUser)
                        .then((user) => {
                            res.status(201)	// CREATED
                                .json(user)
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500)
                                .send("Error: " + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500)
                    .send("Error: " + error);
            });
    } else {
        res.status(400)
            .json({
                "message": "Username, Email and password are required!"
            });
    }
}

const updateUser = (req, res) => {
    const { _id, user_name, email, pwd, first_name, last_name } = req.body;
    if (_id) {
        if (first_name || last_name) {
            const { code, message } = usersDB.updateUser(_id, user_name, email, pwd, first_name, last_name);
            res.status(code)
                .send(message);
        } else {
            res.status(400)
                .json({
                    "message": "At least first name or last name is required!"
                });
        }
    } else {
        res.status(400)
            .json({
                "message": "ID is required!"
            });
    }
}

const deleteUser = (req, res) => {
    const { _id } = req.body;
    if (_id) {
        const { code, message } = usersDB.deleteUser(_id);
        res.status(code)
            .send(message);
    } else {
        res.status(400)
            .json({
                "message": "ID is required!"
            });
    }
}

const getUser = (req, res) => {
    const { _id } = req.body;
    const { code, message } = usersDB.getUser(_id);
    res.status(code)
        .send(message);
}

module.exports = { getAllUsers, addNewUser, updateUser, deleteUser, getUser }