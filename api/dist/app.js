"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const stream_chat_1 = require("stream-chat");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import bcryptjs from "bcryptjs";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// import files
// declaration
const app = (0, express_1.default)();
const dirname = path_1.default.dirname(path_1.default.resolve());
// stream Chat
const api_key = process.env.SC_KEY;
const api_Secret = process.env.SC_SECRET;
if (!api_key || !api_Secret) {
    throw (0, http_errors_1.default)(404, "Stream Chat API key or secret is missing");
}
const serverClient = new stream_chat_1.StreamChat(api_key, api_Secret);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.enable('trust proxy');
//routes
app.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // throw error
        const { username, password } = req.body;
        if (!username || !password)
            throw (0, http_errors_1.default)(400, "parameters missing");
        // const existingUserEmail = await User.findOne({ username: username });
        // if (existingUserEmail)
        //     throw createHttpError(409, "username is already taken!")
        const userId = (0, uuid_1.v4)();
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // const user = await User.create({
        //     username,
        //     firstname,
        //     lastname,
        //     password: hashedPassword,
        //     // cPasswd: hashedPasswd,
        // });
        const token = serverClient.createToken(userId);
        res
            .status(200)
            .json({ token, userId, username, hashedPassword });
    }
    catch (error) {
        next(error);
    }
}));
app.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw (0, http_errors_1.default)(400, "Parameters missing");
        const { users } = yield serverClient.queryUsers({ name: username });
        if (users.length === 0)
            throw (0, http_errors_1.default)(404, "User not found");
        const user = users[0];
        console.log("user is ", user);
        const validPassword = yield bcrypt_1.default.compare(password, user.hashedPassword);
        if (!validPassword)
            throw (0, http_errors_1.default)(401, "Invalid credentials");
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
    }
    catch (error) {
        next(error);
    }
}));
// use the frontend app
app.use(express_1.default.static(path_1.default.join(dirname, "/app/dist")));
console.log(dirname);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(dirname, '/app/dist/index.html'));
});
// get
app.get("/", (req, res, next) => {
    try {
        res.status(200).json({
            message: "server is live"
        });
    }
    catch (error) {
        next(error);
    }
});
// end point middleware
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "endpoint not found"));
});
// error handling middleware
app.use((error, req, res, next) => {
    let errorMessage = "an unknown error occurred(default non-httpError error)";
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
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
    });
});
exports.default = app;
