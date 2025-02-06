"use client";
import React, { useState } from "react";
import { addTodo } from "../lib/api";

export const AddTask = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addTodo(text, "test-user"); // 仮の userId
      setText("");
      window.location.reload(); // Todoリストを更新
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 flex-grow"
        placeholder="新しいタスクを追加..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        追加
      </button>
    </form>
  );
};
