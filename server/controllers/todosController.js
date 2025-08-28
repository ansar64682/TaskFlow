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

    // Create new todo document
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

    // Return all todos (or just the new one - your choice)
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
    console.log(todoId);
    console.log(todoId.length);
    console.log(todoId.type);
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    // Convert string to ObjectId
    const objectId = new mongoose.Types.ObjectId(todoId);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      updates, // This is now dynamic!
      { new: true, runValidators: true }
    );

    if (!updateTodo) {
      res.status(401).json("Not Found");
    }
    res.status(201).json(updatedTodo);
  } catch (error) {
    console.error("error........", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
