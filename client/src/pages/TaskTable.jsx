import React from "react";
import { useTodo } from "../../DataStore";
import AddTask from "./AddTask";

export default function TaskTable({ isDarkMode, showAddBtn, setShowAddBtn }) {
  const { filteredTasks, loading, error, toggleCompletion, delTask } =
    useTodo();

  // Priority colors for both themes
  const priorityColors = {
    high: isDarkMode
      ? "bg-red-500/20 text-red-300 border border-red-500/30"
      : "bg-red-100 text-red-800 border border-red-200",
    medium: isDarkMode
      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
      : "bg-orange-100 text-orange-800 border border-orange-200",
    low: isDarkMode
      ? "bg-green-500/20 text-green-300 border border-green-500/30"
      : "bg-green-100 text-green-800 border border-green-200",
  };

  if (loading) {
    return (
      <div
        className={`p-12 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <div className="inline-flex items-center gap-3">
          <div
            className={`w-6 h-6 border-2 ${
              isDarkMode
                ? "border-blue-500 border-t-transparent"
                : "border-blue-600 border-t-transparent"
            } rounded-full animate-spin`}
          ></div>
          Loading your tasks...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex flex-col items-center gap-3">
          <span className="text-4xl">😕</span>
          <div>
            <p className="text-red-500 font-medium">Failed to load tasks</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } mt-1`}
            >
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredTasks.length === 0 && !showAddBtn) {
    return (
      <div
        className={`p-8 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <div className="inline-flex flex-col items-center gap-3">
          <span className="text-4xl">📝</span>
          <div>
            <p className="font-medium">No tasks yet</p>
            <p className="text-sm mt-1">
              Create your first task to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl ${
        isDarkMode
          ? "bg-gray-800/50 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <table className="w-full">
        <thead>
          <tr
            className={
              isDarkMode
                ? "border-b border-gray-700"
                : "border-b border-gray-200"
            }
          >
            <th className="p-4 text-left font-semibold">Task</th>
            <th className="p-4 text-center font-semibold">Status</th>
            <th className="p-4 text-center font-semibold">Priority</th>
            <th className="p-4 text-center font-semibold">Due Date</th>
            <th className="p-4 text-left font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((todo) => (
            <tr
              key={todo._id}
              className={`group transition-all duration-200 ${
                isDarkMode
                  ? "border-b border-gray-700 hover:bg-gray-700/50"
                  : "border-b border-gray-100 hover:bg-gray-50"
              } ${todo.completed ? "opacity-75" : ""}`}
            >
              {/* Task Title with Completion Toggle */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {/* Completion Toggle */}
                  <button
                    onClick={() => toggleCompletion(todo._id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      todo.completed
                        ? isDarkMode
                          ? "bg-green-500 border-green-500"
                          : "bg-green-500 border-green-500"
                        : isDarkMode
                        ? "border-gray-500 hover:border-green-400"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {todo.completed && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>

                  <span
                    className={`font-medium transition-all duration-200 ${
                      todo.completed
                        ? isDarkMode
                          ? "line-through text-gray-500"
                          : "line-through text-gray-400"
                        : isDarkMode
                        ? "text-gray-200"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
              </td>

              {/* Status Badge */}
              <td className="p-4 text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    todo.completed
                      ? isDarkMode
                        ? "bg-green-500/20 text-green-300"
                        : "bg-green-100 text-green-800"
                      : isDarkMode
                      ? "bg-gray-600 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {todo.completed ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isDarkMode ? "bg-gray-400" : "bg-gray-500"
                        }`}
                      ></span>
                      Pending
                    </span>
                  )}
                </span>
              </td>

              {/* Priority */}
              <td className="p-4 text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    priorityColors[todo.priority] || priorityColors.medium
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-60"></span>
                  {todo.priority?.charAt(0).toUpperCase() +
                    todo.priority?.slice(1)}
                </span>
              </td>

              {/* Due Date */}
              <td className="p-4 text-center">
                {todo.dueDate ? (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    📅 {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                ) : (
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    No date
                  </span>
                )}
              </td>

              {/* Notes */}
              <td className="p-4">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {todo.notes || (
                    <span
                      className={isDarkMode ? "text-gray-600" : "text-gray-400"}
                    >
                      —
                    </span>
                  )}
                </span>
              </td>
              <td>
                <button
                  className="px-2 py-2 rounded-lg  hover:bg-red-700 hover:ring-2 ring-red-100 transition"
                  onClick={() => delTask(todo._id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
          {showAddBtn && (
            <AddTask isDarkMode={isDarkMode} setShowAddBtn={setShowAddBtn} />
          )}
        </tbody>
      </table>
    </div>
  );
}
