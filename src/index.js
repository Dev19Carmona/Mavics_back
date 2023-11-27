/// <reference path="./jsdocs/Product/typeDefs.js" /> // Para usar las definiciones JSDocs
import { startServer } from "./app.js";
import { connectDB } from "./db.js";

connectDB();
startServer()

