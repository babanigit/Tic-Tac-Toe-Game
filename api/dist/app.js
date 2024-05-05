"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
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
// use the frontend app
app.use(express_1.default.static(path_1.default.join(dirname, "/app/dist")));
console.log(dirname);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(dirname, '/app/dist/index.html'));
});
exports.default = app;
