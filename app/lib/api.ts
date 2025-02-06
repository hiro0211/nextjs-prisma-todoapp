const API_URL = "http:/localhost/api/todo";

// Todoの取得
export const fetchTodos = async () => {
  const res = await fetch(API_URL);
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// Todoの追加
export const addTodo = async (text: string, userId: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, userId }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
};

// Todoの更新
export const updateTodo = async (id: string, text: string) => {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, text }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

// Todoの削除
export const deleteTodo = async (id: string) => {
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
