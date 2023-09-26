// Import Libs
const bcrypt = require("bcryptjs"),
    asyncHandler = require("express-async-handler");

// Models
const { User: Users } = require("../models/User.js"),
    { Post: Posts } = require("../models/Post.js");

//  @desc       Get all Users
//  @route      GET       /users
//  @access     Private
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.find().select("-password").lean();
    if (!users?.length) {
        return res.status(400).json({ message: "No Users Found" });
    }
    res.status(200).json(users);
});

//  @desc       Add a User
//  @route      POST / users
//  @access     Private
const addUser = asyncHandler(async (req, res, next) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const duplicate = await Users.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    const pwdHashed = bcrypt.hashSync(password, 10);
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

//  @desc       Update a User
//  @route      PATCH       /users
//  @access     Private
const updateUser = asyncHandler(async (req, res, next) => {
    const { _id, username, password, roles, active } = req.body;

    if (
        !_id ||
        !username ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({ message: "All Fields Are Required" });
    }

    const user = await Users.findById(_id).exec();
    if (!user) {
        return res.status(400).json({ message: "User Not Found" });
    }

    const duplicate = await Users.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    // Update values
    user.username = username;
    user.roles = roles;
    user.active = active;
    if (password) {
        const pwdHashed = bcrypt.hashSync(password, 10);
        user.password = pwdHashed;
    }

    const userUpdate = await user.save();

    if (userUpdate) {
        res.status(201).json({
            message: `User (${username}) Updated Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

//  @desc       Delete a User
//  @route      DELETE       /users
//  @access     Private
const deleteUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.body;
    if (!_id) {
        res.status(400).json({ message: "ID Is Required" });
    }
    // Check if the User has already posted some articles
    const post = await Posts.findOne({ user_id: _id }).lean().exec();
    if (post) {
        res.status(400).json({ message: "User Has Assigned Posts" });
    }
    const user = await Users.findById(_id).exec();
    if (!user) {
        res.status(400).json({ message: "User Not Found" });
    }
    const userDeleted = await user.deleteOne();
    console.log("Deleted User:", userDeleted);
    if (userDeleted) {
        res.status(201).json({
            message: `User (${user.username}) Deleted Successfully`,
        });
    } else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
