import { NextFunction, Request, Response } from "express";
import { ToDo } from "../models/todo";

let toDos: ToDo[] = [];

export const getToDos = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "All ToDos fetched!", result: toDos });
};

export const createToDo = (req: Request, res: Response, next: NextFunction) => {
  const toDoNew: ToDo = {
    _id: new Date().toISOString(),
    text: req.body.text,
  };

  toDos.push(toDoNew);
  res.status(201).json({ message: "ToDo created!", result: toDos });
};

export const updateToDo = (req: Request, res: Response, next: NextFunction) => {
  const tId = req.params.tId;
  const toDoUpdateIndex: number = toDos.findIndex((toDo: ToDo) => {
    return toDo._id === tId;
  });

  if (toDoUpdateIndex > -1) {
    toDos[toDoUpdateIndex] = { ...toDos[toDoUpdateIndex], text: req.body.text };
    res.status(200).json({ message: "ToDo updated!", result: toDos });
  } else {
    res.status(404).json({ message: "ToDo not found!", result: toDos });
  }
};

export const deleteToDo = (req: Request, res: Response, next: NextFunction) => {
  const tId = req.params.tId;
  toDos = toDos.filter((toDo: ToDo) => toDo._id !== tId);

  res.status(200).json({ message: "ToDo updated!", result: toDos });
};
