import * as express from "express";
import * as bodyParser from "body-parser";
import routesToDo from "./routes/todos";

/* @ts-ignore */
const app = express();

app.use(bodyParser.json());
app.use(routesToDo);

app.listen(8282);
