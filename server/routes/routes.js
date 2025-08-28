import express from "express";
import {
  getTodo,
  addTodo,
  updateTodo,
} from "../controllers/todosController.js";

const router = express.Router();

router.get("/api/todos", getTodo);
router.post("/api/addTodo", addTodo);
router.put("/api/todos/:id", updateTodo);

export default router;
