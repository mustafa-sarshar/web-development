import { Router } from "express";
import { createToDo, getToDos } from "../controllers/todos";

const router = Router();

router
  .route("/") // Route: /
  .get(getToDos); // Method: GET

router
  .route("/todo") // Route: /todo
  .post(createToDo); // Method: POST

export default router;
