// const express = require("express");
import express from "express";
import bodyParser from "body-parser";
import routesToDo from "./routes/todos";

const app = express();

app.use(bodyParser.json());
app.use(routesToDo);

app.listen(8282);
