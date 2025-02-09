"use client";
import { useState, useEffect } from "react";
import { AddTask } from "./components/AddTask";
import { TodoList } from "./components/TodoList";
import { fetchTodos, deleteTodo, updateTodo, addTodo } from "./lib/api";
import { Task } from "./types/types";

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const handleAdd = async (text: string, userId: string) => {
    try {
      const newTodo = await addTodo(text, userId);
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string, newText: string) => {
    try {
      await updateTodo(id, newText);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">
        Next.js Prisma ToDoApp
      </h1>
      <div className="w-full max-w-xl items-center justify-center mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTask onAdd={handleAdd} />
          <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    </main>
  );
}
