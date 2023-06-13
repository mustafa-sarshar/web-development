"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToDo = exports.getToDos = void 0;
var toDos = [];
var getToDos = function (req, res, next) {
    res.status(200).json({ result: toDos });
};
exports.getToDos = getToDos;
var createToDo = function (req, res, next) {
    var toDoNew = {
        _id: new Date().toISOString(),
        text: req.body.text,
    };
    toDos.push(toDoNew);
    res.status(200).json({ result: toDos });
};
exports.createToDo = createToDo;
