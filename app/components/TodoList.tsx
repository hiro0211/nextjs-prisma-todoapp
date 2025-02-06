"use client";
import React, { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "../lib/api";

export const TodoList = () => {
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between p-2 bg-gray-100 my-2">
          <span>{todo.text}</span>
          <button
            onClick={() => handleDelete(todo.id)}
            className="text-red-500"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};
