
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"
import path from 'path';

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// import files


// declaration
const app: Express = express();
const dirname = path.dirname(path.resolve());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.enable('trust proxy')

//routes


// // use the frontend app
// app.use(express.static(path.join(dirname, "/app/dist")));
// console.log(dirname)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(dirname, '/app/dist/index.html'));
// });

// get
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "server is live"
        })
    } catch (error) {
        next(error)
    }
});

// end point middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "endpoint not found"))
});

// error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {

    let errorMessage = "an unknown error occurred(default non-httpError error)";
    let statusCode = 500;

    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }

    console.error("[console log error] ", error);

    res
        .status(statusCode)
        .json({
            success: false,
            error: errorMessage,
            statusCode,
        })
})

export default app;
