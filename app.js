// MODULE IMPORTS
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// ROUTE IMPORTS

// CONFIG AND INITIALIZATION
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ROUTES
app.get("/", async (req, res) => {
  res.status(200).send("API WORKING.");
});

export default app;
