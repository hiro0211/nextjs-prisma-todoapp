const API_URL = "http://localhost:3000/api/todo";

// Todoの取得
export const fetchTodos = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todoの追加
export const addTodo = async (text: string, userId: string) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, userId }),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todoの更新
export const updateTodo = async (id: string, text: string) => {
  try {
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todoの削除
export const deleteTodo = async (id: string) => {
  try {
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to delete todo");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
