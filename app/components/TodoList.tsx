"use client";
import React from "react";
import { Task } from "../types/types";
import { Todo } from "./Todo";

interface TodoListProps {
  todos: Task[];
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
};
