/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useTodo } from "../../DataStore";

export default function AddTask({ isDarkMode, setShowAddBtn }) {
  const { addNewTask } = useTodo();
  const [title, setTitle] = useState();
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(false);
  const [priority, setPriority] = useState();
  const [dueDate, setDueDate] = useState();
  const [notes, setNotes] = useState();

  const newTask = {
    title: title,
    completed: completed,
    selected: selected,
    priority: priority,
    dueDate: dueDate,
    notes: notes,
  };
  console.log(newTask);

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

  return (
    <tr
      className={`group transition-all duration-200 ${
        isDarkMode
          ? "border-b border-gray-700 hover:bg-gray-700/50"
          : "border-b border-gray-100 hover:bg-gray-50"
      }`}
    >
      {/* Task Title with Input */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          {/* Placeholder for Completion Toggle */}
          <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 opacity-50"></div>

          <input
            type="text"
            placeholder="Enter task title..."
            className={`font-medium transition-all duration-200 bg-transparent border-none outline-none w-full ${
              isDarkMode
                ? "text-gray-200 placeholder-gray-500"
                : "text-gray-800 placeholder-gray-400"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </td>

      {/* Status Badge (Static for new task) */}
      <td className="p-4 text-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isDarkMode
              ? "bg-gray-600 text-gray-300"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <span className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isDarkMode ? "bg-gray-400" : "bg-gray-500"
              }`}
            ></span>
            Pending
          </span>
        </span>
      </td>

      {/* Priority Select */}
      <td className="p-4 text-center">
        <select
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border outline-none cursor-pointer ${priorityColors.medium}`}
          defaultValue=""
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Priority</option>
          <option className="bg-red-600 text-white" value="high">
            High
          </option>
          <option className="bg-amber-500 text-white" value="medium">
            Medium
          </option>
          <option className="bg-green-700 text-white" value="low">
            Low
          </option>
        </select>
      </td>

      {/* Due Date Input */}
      <td className="p-4 text-center">
        <input
          type="date"
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${
            isDarkMode
              ? "bg-blue-500/20 text-blue-300"
              : "bg-blue-100 text-blue-800"
          }`}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </td>

      {/* Notes Input */}
      <td className="p-4">
        <input
          type="text"
          placeholder="Add notes..."
          className={`text-sm bg-transparent border-none outline-none w-full ${
            isDarkMode
              ? "text-gray-400 placeholder-gray-500"
              : "text-gray-600 placeholder-gray-400"
          }`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </td>
      <td className="p-2 text-center">
        <button
          className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
          onClick={() => {
            addNewTask(newTask);
            setShowAddBtn(false);
          }}
        >
          ✅ Finish
        </button>
      </td>
      <td className=" text-center">
        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-500 transition"
          onClick={() => setShowAddBtn(false)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
