"use client";

import TodosService from "@/api/TodosService";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true);
      const service = new TodosService();
      const data = await service.fetchAllTodos();
      setTodos(data);
      setIsLoading(false);
    }

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodoTitle.trim() === "") return;

    const service = new TodosService();
    const newTodo = await service.createTodo({
      title: newTodoTitle,
      completed: false,
    });

    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  return (
    <main className="w-full max-w-lg min-h-screen bg-gray-100 px-8 py-8 flex flex-col items-center justify-center rounded-3xl">
      <h1 className="text-3xl font-medium mb-6">Todo List</h1>
      <ul className="w-full space-y-4 mb-6">
        {isLoading ? (
          <li>Loading...</li>
        ) : todos.length ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span
                className={`text-xl ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={async () => {
                  const service = new TodosService();
                  await service.deleteTodoById(todo.id!);
                  setTodos(todos.filter((t) => t.id !== todo.id));
                }}
              >
                &times;
              </button>
            </li>
          ))
        ) : (
          <li>No todos available</li>
        )}
      </ul>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={newTodoTitle}
          onChange={handleChange}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Enter new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all duration-300"
        >
          Add Todo
        </button>
      </div>
    </main>
  );
}
