// Import Libs
const bcrypt = require("bcrypt"),
    asyncHandler = require("express-async-handler");

// Models
const { User: Users } = require("../models/User.js"),
    { Post: Posts } = require("../models/Post.js");

/*
    @desc       Get all Users
    @route      GET       /users
    @access     Private
*/
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.find().select("-password").lean();
    if (!users) {
        return res.status(400).json({ message: "No Users Found" });
    }
    res.json(users);
});

/*
    @desc       Add a User
    @route      POST       /users
    @access     Private
*/
const addUser = asyncHandler(async (req, res, next) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const duplicate = await Users.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    const pwdHashed = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
        username,
        password: pwdHashed,
        roles,
    });

    if (newUser) {
        res.status(201).json({
            message: `User (${username}) Added Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

/*
    @desc       Update a User
    @route      PATCH       /users
    @access     Private
*/
const updateUser = asyncHandler(async (req, res, next) => {
    const { _id, username, password, roles, active } = req.body;

    if (
        !_id ||
        !username ||
        !password ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const duplicate = await Users.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    const pwdHashed = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
        username,
        password: pwdHashed,
        roles,
    });

    if (newUser) {
        res.status(201).json({
            message: `User (${username}) Added Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

/*
    @desc       Delete a User
    @route      DELETE       /users
    @access     Private
*/
const deleteUser = asyncHandler(async (req, res, next) => {});

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
