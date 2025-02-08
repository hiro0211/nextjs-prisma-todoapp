"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "../lib/api";
import { Task } from "../types/types";
import { todo } from "node:test";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Task;
}

export const TodoList = ({ todo }: TodoProps) => {
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoText, setEditedTodoText] = useState(todo.text);
  const router = useRouter();

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

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

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (id: string) => {
    try {
      await updateTodo(id, editedTodoText);
      setIsEditing(false);
      router.refresh();
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
          {isEditing ? (
            <input
              ref={ref}
              type="text"
              className="mr-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
              value={editedTodoText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedTodoText(e.target.value)
              }
            />
          ) : (
            <span className="text-gray-700">{todo.text}</span>
          )}
          <div className="flex space-x-2">
            {isEditing ? (
              <button
                onClick={() => handleSave(todo.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                保存
              </button>
            ) : (
              <button
                onClick={handleEdit}
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
