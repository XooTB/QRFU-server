import http from "http";
import app from "./app.js";
import connectDB from "./connect.js";
import * as dotenv from "dotenv";

// CONFIG AND INITALIZATION
dotenv.config();

// ASSIGNING PORT AND OTHER CONFIGS
const port = process.env.PORT || 4000;

const server = http.createServer(app);

// CONNECTING DATABSE AND STARTING THE REST SERVER.
try {
  connectDB(process.env.MONGODB_URL);
  server.listen(port);
} catch (err) {
  console.log(err.message);
}
