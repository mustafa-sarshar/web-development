"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var todos_1 = require("./routes/todos");
/* @ts-ignore */
var app = express();
app.use(bodyParser.json());
app.use(todos_1.default);
app.listen(8282);
