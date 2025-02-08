"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "../lib/api";
import { Task } from "../types/types";
import { todo } from "node:test";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Task;
}

export const TodoList = ({todo}: TodoProps) => {
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

  const handleEdit = async () =>{
    setIsEditing(true);
  }

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
        <li key={todo.id} className="flex justify-between p-2 bg-gray-100 my-2">
          <span>{todo.text}</span>
          <div>
            {isEditing ? (
              <button>
                <button
                  onClick={() => handleSave(todo.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  保存
                </button>
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
              className="text-red-500"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
