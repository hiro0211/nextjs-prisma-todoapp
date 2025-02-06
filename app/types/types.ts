export interface Task {
  id: string;
  text: string;
}

export interface User {
  id: string; // `id` プロパティを明示的に追加
  name: string;
  email: string;
  image: string;
  todos?: Task[]; // Optional: ユーザーに紐づくTodoリスト
}
