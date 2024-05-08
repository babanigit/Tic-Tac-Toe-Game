
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"
import path from 'path';

import { StreamChat } from "stream-chat"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import { error } from "console";
dotenv.config({ path: "../.env" });

// import files


// declaration
const app: Express = express();
const dirname = path.dirname(path.resolve());

// stream Chat
const api_key = process.env.SC_KEY as string;
const api_Secret = process.env.SC_SECRET as string;
if (!api_key || !api_Secret) {
    throw createHttpError(404, "Stream Chat API key or secret is missing");
}
const serverClient = new StreamChat(api_key as string, api_Secret as string);


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.enable('trust proxy')

//routes

app.post("/register", async (req: Request, res: Response, next: NextFunction) => {

    try {
        // throw error
        const { firstname, lastname, username, password } = req.body;
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstname, lastname, username, hashedPassword });

    } catch (error) {
        next(error)
    }
})


// use the frontend app
app.use(express.static(path.join(dirname, "/app/dist")));
console.log(dirname)
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, '/app/dist/index.html'));
});

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
