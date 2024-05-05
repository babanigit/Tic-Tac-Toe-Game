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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// import files
// declaration
const app = (0, express_1.default)();
const dirname = path_1.default.dirname(path_1.default.resolve());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.enable('trust proxy');
//routes
// // use the frontend app
// app.use(express.static(path.join(dirname, "/app/dist")));
// console.log(dirname)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(dirname, '/app/dist/index.html'));
// });
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
