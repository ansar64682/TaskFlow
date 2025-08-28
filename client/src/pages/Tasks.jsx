import { useState } from "react";
import { useTodo } from "../../DataStore";
import TaskTable from "./TaskTable";

export default function TasksPage() {
  const { todos, loading, error } = useTodo();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-800"
      }`}
    >
      {/* Top Navigation Bar */}
      <div
        className={`sticky top-0 z-50 backdrop-blur-md ${
          isDarkMode
            ? "bg-gray-900/80 border-b border-gray-700"
            : "bg-white/80 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                }`}
              >
                <span className="text-lg font-bold">✓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your productivity
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-blue-600 justify-end"
                    : "bg-gray-300 justify-start"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    isDarkMode ? "bg-white" : "bg-white"
                  }`}
                />
              </button>

              {/* Add Task Button */}
              <button
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>+</span>
                  New Task
                </span>
              </button>

              {/*Delete Buton */}
              <button
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg ${
                  isDarkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-900 text-white"
                }`}
              >
                <span className="flex items-center gap-2">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Tasks
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {todos.length}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-blue-600/20" : "bg-blue-100"
                }`}
              >
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Completed
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {todos.filter((todo) => todo.completed).length}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-green-600/20" : "bg-green-100"
                }`}
              >
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Pending
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {todos.filter((todo) => !todo.completed).length}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-orange-600/20" : "bg-orange-100"
                }`}
              >
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Table Section */}
        <div
          className={`rounded-2xl backdrop-blur-sm border ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}
        >
          {/* Table Header */}
          <div
            className={`px-6 py-4 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>📝</span>
              Your Tasks
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Loading your tasks...
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-12 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <span className="text-4xl">😕</span>
                <div>
                  <p className="text-red-600 font-medium">
                    Something went wrong
                  </p>
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
          )}

          {/* Task Table */}
          {!loading && !error && (
            <div className="p-6">
              <TaskTable isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
