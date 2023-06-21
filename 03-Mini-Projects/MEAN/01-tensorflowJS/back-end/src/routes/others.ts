import { Router } from "express";
import { getFib, getFactorial } from "../controllers/others";

export const router: Router = Router();

router
  .route("/fib/:num") // Route: /others/fib/{num}
  .get(getFib); // Method: GET

router
  .route("/factorial/:num") // Route: /others/factorial/{num}
  .get(getFactorial); // Method: GET
