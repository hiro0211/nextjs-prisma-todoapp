"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "../lib/api";
import { Task } from "../types/types";
import { useRouter } from "next/navigation";

export const TodoList = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null); 
  const [editedTodoText, setEditedTodoText] = useState<string>(""); 
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = (id: string, text: string) => {
    setIsEditing(id); 
    setEditedTodoText(text); 
  };

  const handleSave = async (id: string) => {
    try {
      await updateTodo(id, editedTodoText);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text: editedTodoText } : todo))
      );
      setIsEditing(null);
      setEditedTodoText(""); 
      router.refresh();
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
    <ul className="mt-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
        >
          {isEditing === todo.id ? (
            <input
              ref={ref}
              type="text"
              className="mr-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
              value={editedTodoText}
              onChange={(e) => setEditedTodoText(e.target.value)}
            />
          ) : (
            <span className="text-gray-700">{todo.text}</span>
          )}
          <div className="flex space-x-2">
            {isEditing === todo.id ? (
              <button
                onClick={() => handleSave(todo.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                保存
              </button>
            ) : (
              <button
                onClick={() => handleEdit(todo.id, todo.text)}
                className="text-green-500 hover:text-green-700"
              >
                編集
              </button>
            )}
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
