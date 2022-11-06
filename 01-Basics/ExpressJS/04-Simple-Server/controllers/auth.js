const { use } = require("express/lib/application");
const
    { v4: uuidV4, __esModule } = require("uuid"),
    fs = require("fs"),
    path = require("path"),
    bcrypt = require('bcryptjs');

const usersDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
    userCheck: function (user_name, pwd) {
        try {
            const userFound = usersDB.users.find((user) => user.user_name === user_name);
            if (userFound) {
                const checkPwd = bcrypt.compareSync(pwd, userFound.pwd);
                if (checkPwd) {
                    //  Create JWTs
                    return {
                        code: 200,      // Successful
                        message: JSON.stringify(userFound)
                    }
                } else {
                    return {
                        code: 401,      // Unauthorized
                        message: "Password does not match!!!"
                    }
                }
            } else {
                return {
                    code: 401,      // Unauthorized
                    message: "User not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    }
}

const handleLogin = async (req, res) => {
    const { user_name, pwd } = req.body;
    if (user_name && pwd) {
        const { code, message } = usersDB.userCheck(user_name, pwd);
        res.status(code)
            .send(message);
    } else {
        res.status(400)
            .json({
                "message": "Username and password are required!"
            });
    }
}

module.exports = { handleLogin };