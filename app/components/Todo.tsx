"use client";
import React, { useRef, useState } from "react";
import { Task } from "../types/types";

interface TodoProps {
  todo: Task;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const Todo: React.FC<TodoProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(todo.text);
  const ref = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(todo.text);
    ref.current?.focus();
  };

  const handleSave = () => {
    if (!editedText.trim()) return;
    onUpdate(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow">
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span className="text-gray-700">{todo.text}</span>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-blue-500 hover:text-blue-700">
            保存
          </button>
        ) : (
          <button onClick={handleEdit} className="text-green-500 hover:text-green-700">
            編集
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700">
          削除
        </button>
      </div>
    </li>
  );
};
