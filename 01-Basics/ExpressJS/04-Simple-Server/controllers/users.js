const
    { v4: uuidV4 } = require("uuid"),
    fs = require("fs"),
    path = require("path"),
    bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const usersDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
    addUser: function (user_name, email, pwd, first_name, last_name) {
        console.log(user_name, email, pwd, first_name, last_name);
        try {
            const duplicateCheck = this.users.find((user) => user.user_name === user_name);
            if (!duplicateCheck) {
                const newUser = {
                    "_id": uuidV4(),
                    "user_name": user_name,
                    "email": email,
                    "pwd": bcrypt.hashSync(pwd, salt),
                    "first_name": first_name !== undefined ? first_name : "1",
                    "last_name": last_name !== undefined ? last_name : "1"
                }
                this.setUsers([...this.users, newUser]);
                fs.writeFileSync(
                    path.join(__dirname, "..", "models", "users.json"),
                    JSON.stringify(this.users, null, "\t")
                );
                return {
                    code: 201,      // Created new record
                    message: JSON.stringify(newUser)
                }
            } else {
                return {
                    code: 409,      // Conflict
                    message: "The username is not available!!!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    },
    updateUser: function (_id, user_name, email, pwd, first_name, last_name) {
        try {
            const updateUser = this.users.find((user) => user._id == _id);
            console.log(_id, user_name, email, pwd, first_name, last_name, updateUser);
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
            const deleteUser = this.users.find((user) => user._id == _id);
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
            const user = this.users.find((user) => user._id == _id);
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
    res.json(usersDB.users);
}

const addNewUser = (req, res) => {
    const { user_name, email, pwd, first_name, last_name } = req.body;
    if (user_name && email && pwd) {
        const { code, message } = usersDB.addUser(user_name, email, pwd, first_name, last_name);
        res.status(code)
            .send(message);
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