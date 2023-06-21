import { Router } from "express";
import { getModel, getModelWorker } from "../controllers/ai";

export const router: Router = Router();

router
  .route("/:processId") // Route: /ai/{processId}
  .get(getModel); // Method: GET

router
  .route("/worker/:processId") // Route: /ai/worker/{processId}
  .get(getModelWorker); // Method: GET
