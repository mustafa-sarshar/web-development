import express from "express";
import { getPost, createPost } from "../controller/posts.js";

const router = express.Router();

router.route("/")
    .get(getPost)
    .post(createPost)

export default router;