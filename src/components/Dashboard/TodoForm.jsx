import React, { useState } from "react";
import { useSelector } from "react-redux";
import todoService from "../../appwrite/TodoService";

const TodoForm = ({ addTodo }) => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const userId = useSelector((state) => state.auth.userData?.$id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return; // Ensure title is not empty
    if (!userId) return; // Ensure userId exists

    try {
      const newTodo = { title: content, userId };
      await addTodo(newTodo); // Add todo through the parent handler
      setContent(""); // Reset input
      setStatus(true); // Show success message
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
      {status && <div><h1>Todo Added Successfully</h1></div>}
    </>
  );
};

export default TodoForm;
