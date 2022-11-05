const
    { v4: uuidV4 } = require("uuid"),
    fsPromises = require("fs").promises,
    path = require("path");
    // bcrypt = require("bcrypt");

const usersDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
    addUser: async function (user_name, email, pwd, first_name, last_name) {
        try {
            const duplicateCheck = this.users.find((user) => user.user_name === user_name);
            if (!duplicateCheck) {
                const newUser = {
                    "id": uuidV4(),
                    "user_name": user_name,
                    "email": email,
                    // "pwd": await bcrypt.hash(pwd, 10),
                    "pwd": pwd,
                    "first_name": first_name !== undefined ? first_name : "1",
                    "last_name": last_name !== undefined ? last_name : "1"
                }
                this.setUsers([...this.users, newUser]);
                await fsPromises.writeFile(
                    path.join(__dirname, "..", "model", "users.json"),
                    JSON.stringify(this.users)
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
    updateUser: function (_id, first_name, last_name) {
        try {
            const updateUser = this.users.find((user) => user.id == _id);
            if (updateUser) {
                if (first_name) updateUser.first_name = first_name;
                if (last_name) updateUser.last_name = last_name;
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
            const deleteUser = this.users.find((user) => user.id == _id);
            if (deleteUser) {
                const usersFiltered = this.users.filter((user) => user.id != _id);
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
            const user = this.users.find((user) => user.id == _id);
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

const addNewUser = async (req, res) => {
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
            const { code, message } = usersDB.updateUser(_id, first_name, last_name);
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
    const _id = req.body.id;
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
    const _id = req.params.id;
    const { code, message } = usersDB.getUser(_id);
    res.status(code)
        .send(message);
}

module.exports = { getAllUsers, addNewUser, updateUser, deleteUser, getUser }