import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import authService from "../../appwrite/auth";
import { login as authLogin, logout } from "../../store/authSlice"; 
import WelcomeMessage from "../Header/WelcomeMessage ";
import TodoForm from "../Dashboard/TodoForm";
import TodoList from "../Dashboard/TodoList";
import todoService from "../../appwrite/TodoService";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);

  // Fetch todos
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getcurrentUser();
        if (user) {
          dispatch(authLogin(user));
        }
      } catch (error) {
        console.error("No active session found:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userTodos = await todoService.getTodos(userId);
        setTodos(userTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchTodos();
  }, [userId]);

  const addTodo = async (newTodo) => {
    try {
      const addedTodo = await todoService.addTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await todoService.deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.$id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (todoId) => {
    const newTitle = prompt("Enter new title for the Todo:");
    if (!newTitle) return;

    try {
      const updatedTodo = await todoService.updateTodo(todoId, { title: newTitle });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.$id === todoId ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Filter Todos based on searchTerm
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return authStatus ? (
    <div>
      <WelcomeMessage />

      {/* Search Input */}
      

      <TodoForm addTodo={addTodo} />
      <div className="p-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      </div>
      <TodoList
        todos={filteredTodos} // Pass filtered todos here
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  ) : (
    <div className="bg-gray-100 text-center p-4 mt-16">
      <h1 className="text-2xl font-bold">Please Login First</h1>
    </div>
  );
};

export default Home;
