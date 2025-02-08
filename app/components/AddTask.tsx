"use client";
import React, { useState } from "react";
import { addTodo } from "../lib/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AddTask = () => {
  const [text, setText] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!session?.user?.id) {
      router.push("/api/auth/signin");
      return;
    }

    try {
      await addTodo(text, session.user.id);
      setText("");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        placeholder="新しいタスクを追加..."
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95"
      >
        作成
      </button>
    </form>
  );
};
