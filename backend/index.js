import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/db.js";

import userRoutes from "./src/routes/user.routes.js";
import sweetRoutes from "./src/routes/sweet.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.use("/user", userRoutes);
app.use("/sweet", sweetRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server running on port 3000");
});
