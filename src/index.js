import { startServer } from "./app.js";
import { connectDB } from "./db.js";

connectDB();
startServer()

