import { NextFunction, Response, Request } from "express";
import { ToDo } from "../models/todo";

const toDos: ToDo[] = [];

export const getToDos = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ result: toDos });
};

export const createToDo = (req: Request, res: Response, next: NextFunction) => {
  const toDoNew: ToDo = {
    _id: new Date().toISOString(),
    text: req.body.text,
  };

  toDos.push(toDoNew);
  res.status(200).json({ result: toDos });
};
