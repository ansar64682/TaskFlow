/* eslint-disable react-refresh/only-export-components */
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
  const [filter, setFilter] = useState(null);

  const filteredTodos = () => {
    let result = [...todos];

    result = result.filter((prev) => {
      if (filter === null) {
        return true;
      } else {
        return prev.completed === filter;
      }
    });
    return result;
  };

  const filteredTasks = filteredTodos();

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

  const addNewTask = async (newTask) => {
    try {
      console.log("recieved new task", newTask);

      const response = await fetch("http://localhost:5000/api/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("HTTP Error! status : ", response.status);
      }
      fetchTodos();
    } catch (err) {
      console.log("An error occured ", err);
    }
  };

  const delTask = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${todoId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Delete failed");
      fetchTodos();
    } catch (err) {
      console.log("Error Ocuured......", err);
    }
  };

  const values = {
    todos,
    loading,
    error,
    filteredTasks,
    setFilter,
    fetchTodos,
    toggleCompletion,
    addNewTask,
    delTask,
  };
  // console.log(todos);

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
};
