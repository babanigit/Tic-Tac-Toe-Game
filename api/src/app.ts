
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


// use the frontend app
app.use(express.static(path.join(dirname, "/app/dist")));
console.log(dirname)
app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, '/app/dist/index.html'));
});


export default app;
