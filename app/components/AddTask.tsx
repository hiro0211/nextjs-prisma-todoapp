"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTask = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<string[]>([]); // TODOリストは配列に変更
  const [text, setText] = useState<string>("");

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(e.target.value + "にtextが変更されました");
  };

  // APIからTODOリストを取得する関数
  const fetchTodos = async () => {
    const response = await axios.get("/api/todo");
    setTodos(response.data);
  };

  // 新しいTODOを追加する関数
  const addTodo = async (e: FormEvent) => {
    e.preventDefault(); // フォームのデフォルト動作を無効化

    if (text === "") {
      console.log("空では追加できません");
      return;
    }

    try {
      await axios.post("/api/todo", {
        text,
      });
      console.log(text + "を追加しました");
      setText(""); // 入力をクリア
      fetchTodos(); // 最新のTODOを取得
    } catch (error) {
      console.error("TODOの追加に失敗しました", error);
    }
  };

  return (
    <div>
      <form className="mb-4 space-y-3" onSubmit={addTodo}>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          type="text"
          onChange={changeText}
          value={text}
          placeholder="新しいTodoを入力"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95"
        >
          Todoを追加
        </button>
      </form>
    </div>
  );
};

export default AddTask;
