import express from "express";
import router from "./routes/routes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const port = process.env.PORT || 8800;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use("/", router);

app.listen(port, () => {
  console.log("Server Running On Port", port);
});
