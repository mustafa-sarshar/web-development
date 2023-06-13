"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos_1 = require("../controllers/todos");
var router = (0, express_1.Router)();
router
    .route("/") // Route: /
    .get(todos_1.getToDos); // Method: GET
router
    .route("/todo") // Route: /todo
    .post(todos_1.createToDo); // Method: POST
exports.default = router;
