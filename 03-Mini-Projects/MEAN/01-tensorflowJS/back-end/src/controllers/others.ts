import { NextFunction, Request, Response } from "express";
import * as path from "path";

import { createWorker } from "../utilities/workers";

export const getFib = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { num } = req.params;

    // Create Worker
    const result = await createWorker(
      path.join(__dirname, "..", "workers", "fib.ts"),
      {
        num: +num,
      }
    );
    res.status(200).json({ message: `Fib(${num}): ${result}` });
  } catch (error) {
    next(error);
  }
};

export const getFactorial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { num } = req.params;

    // Create Worker
    const result = await createWorker(
      path.join(__dirname, "..", "workers", "factorial.ts"),
      {
        num: +num,
      }
    );
    res.status(200).json({ message: `Factorial(${num}): ${result}` });
  } catch (error) {
    next(error);
  }
};
