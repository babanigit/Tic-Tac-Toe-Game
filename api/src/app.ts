import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import path from "path";

import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import bcryptjs from "bcryptjs";

import dotenv from "dotenv";
import { error } from "console";
import User from "./models/userSchema";
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
app.enable("trust proxy");

//routes
app.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // throw error
            const { username, password } = req.body;
            if (!username || !password)
                throw createHttpError(400, "parameters missing");

            // const existingUserEmail = await User.findOne({ username: username });
            // if (existingUserEmail)
            //     throw createHttpError(409, "username is already taken!")

            const userId = uuidv4();
            const hashedPassword = await bcrypt.hash(password, 10);

            // const user = await User.create({
            //     username,
            //     firstname,
            //     lastname,
            //     password: hashedPassword,
            //     // cPasswd: hashedPasswd,
            // });

            const token = serverClient.createToken(userId);

            res.status(200).json({ token, userId, username, hashedPassword });
        } catch (error) {
            next(error);
        }
    }
);

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw createHttpError(400, "Parameters missing");

        const { users } = await serverClient.queryUsers({ name: username });

        if (users.length === 0) throw createHttpError(404, "User not found");

        const user = users[0];

        console.log("user is ", user);

        const validPassword = await bcrypt.compare(
            password,
            user.hashedPassword as string
        );
        if (!validPassword) throw createHttpError(401, "Invalid credentials");

        const token = serverClient.createToken(user.id);

        console.log(token, user.firstName, user.lastName, username, user.id);

        res.status(200).json({
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            username,
            hashedPassword: user.hashedPassword,
            userId: user.id,
        });
    } catch (error) {
        next(error);
    }
});

const bool: string | undefined = process.env.NODE_ENV || "production";

let pathToIndex = path.resolve();

if (bool !== "production") {
    pathToIndex = path.dirname(path.resolve());
    console.log("production dir ", pathToIndex);
}

// // use the frontend app
// app.use(express.static(path.join(pathToIndex, "/app/dist")));
// console.log(pathToIndex);
// app.get("*", (req, res) => {
//     res.sendFile(path.join(pathToIndex, "/app/dist/index.html"));
// });

// get
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "server is live",
        });
    } catch (error) {
        next(error);
    }
});

// end point middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "endpoint not found"));
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

    res.status(statusCode).json({
        success: false,
        error: errorMessage,
        statusCode,
    });
});

export default app;
