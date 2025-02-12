import React from "react";

const TodoList = ({ todos, deleteTodo, updateTodo }) => {

  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Todos</h2>
      {todos.length === 0 ? (
        <p>No todos yet. Add your first one below!</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.$id}
              className="w-4/5 mx-auto p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between"
            >
              {/* Title */}
              <span className="text-lg font-semibold text-gray-800 truncate">
                {todo.title}
              </span>
              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateTodo(todo.$id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTodo(todo.$id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
