import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import { router as aiRoutes } from "./routes/ai";
import { router as othersRoutes } from "./routes/others";

const app = express();
const PORT: number = 4000;

// Apply middleware
app.use(bodyParser.json({ limit: "30mb", strict: false }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Alright!!!",
  });
});

app.use("/ai", aiRoutes);
app.use("/others", othersRoutes);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.info(`App is running on ${PORT}!`);
});
