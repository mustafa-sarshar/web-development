require("dotenv").config();
const { v4: uuidV4, __esModule } = require("uuid"),
  fsPromises = require("fs").promises,
  path = require("path"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleLogin = async (req, res) => {
  const { user_name, pwd } = req.body;
  if (user_name && pwd) {
    try {
      const userFound = await usersDB.users.find(
        (user) => user.user_name === user_name
      );
      console.log(user_name, pwd, userFound);
      if (userFound) {
        const checkPwd = await bcrypt.compareSync(pwd, userFound.pwd);
        if (checkPwd) {
          //  Create JWTs
          const accessToken = jwt.sign(
            { username: userFound.user_name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          const refreshToken = jwt.sign(
            { username: userFound.user_name },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "300s" }
          );
          // Saving refreshToken with current user
          const otherUsers = usersDB.filter(
            (user) => user.user_name !== userFound.user_name
          );
          const currentUser = { ...userFound, refreshToken };
          usersDB.setUsers([...otherUsers, currentUser]);
          await fsPromises.writeFile(
            path.join(__dirname, "..", "models", "users.json"),
            JSON.stringify(this.users, null, "\t")
          );
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.json({ accessToken });
        } else {
          return {
            code: 401, // Unauthorized
            message: "Password does not match!!!",
          };
        }
      } else {
        return {
          code: 401, // Unauthorized
          message: "User not found!",
        };
      }
    } catch (err) {
      return {
        code: 500, // Server internal error
        message: err.message,
      };
    }
  } else {
    res.status(400).json({
      message: "Username and password are required!",
    });
  }
};

module.exports = { handleLogin };
