// MODULE IMPORTS
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// ROUTE IMPORTS
import CardRoutes from "./routes/card.routes.js";
import UserRoutes from "./routes/user.routes.js";

// CONFIG AND INITIALIZATION
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ROUTES
app.get("/", async (req, res) => {
  res.status(200).send("API WORKING.");
});

app.use("/api/v1/cards", CardRoutes);
app.use("/api/v1/user", UserRoutes);

export default app;
