import Todo from "../models/Todo.js";
import mongoose from "mongoose";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("fetching todos....", todos);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos");
    res.status(500).json(error);
  }
};

// ADD a new todo
export const addTodo = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { title, completed, selected, dueDate, priority, notes } = req.body;

    const newTodo = new Todo({
      title,
      completed: completed === true || completed === "true",
      selected: selected === true || selected === "true",
      dueDate: dueDate || null,
      priority: priority || "medium",
      notes: notes || "",
    });

    // Save to database
    const savedTodo = await newTodo.save();
    console.log("Todo saved to DB:", savedTodo);

    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updates = req.body;

    console.log("Updating todo:", todoId);
    console.log("Update data:", updates);

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
