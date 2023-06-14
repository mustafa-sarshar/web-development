import { Router } from "express";
import {
  createToDo,
  deleteToDo,
  getToDos,
  updateToDo,
} from "../controllers/todos";

const router = Router();

router
  .route("/") // Route: /
  .get(getToDos); // Method: GET

router
  .route("/todo") // Route: /todo
  .post(createToDo); // Method: POST

router
  .route("/todo/:tId") //Route: /todo/{id}
  .put(updateToDo) // Method: PUT
  .delete(deleteToDo); // Method: DELETE

export default router;
