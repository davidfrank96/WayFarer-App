/* eslint-disable no-console */
import express from "express";
import logger from "morgan";
import { config } from "dotenv";
import bodyParser from "body-parser";
import "babel-polyfill";
import ErrorHandler from "./middlewares/ErrorHandler";
import apiRoutes from "./routes";

config();

const app = express();
const port = process.env.PORT || 9000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use("/api", apiRoutes);
app.use("*", (req, res) =>
    res.status(404).json({
        status: 404,
        error: "Page Not Found"
    })
);




app.use(ErrorHandler.sendError);

app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});

export default app;
