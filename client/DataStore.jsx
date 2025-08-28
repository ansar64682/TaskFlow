/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const TodosContext = createContext();

export const useTodo = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Starting fetch...");

      const response = await fetch("http://localhost:5000/api/todos");
      console.log("📡 Response status:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ Data received:", data);
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleCompletion = async (todoId) => {
    try {
      const todoToUpdate = todos.find((todo) => todo._id === todoId);
      if (!todoToUpdate) return;

      const newCompletedStatus = !todoToUpdate.completed;
      const response = await fetch(
        `http://localhost:5000/api/todos/${todoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: newCompletedStatus }),
        }
      );
      console.log("Sending update:", { completed: newCompletedStatus });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTodos();
    } catch (err) {
      console.log("toggle Error ", err);
    }
  };

  const values = {
    todos,
    loading,
    error,
    fetchTodos,
    toggleCompletion,
  };
  // console.log(todos);

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
};
