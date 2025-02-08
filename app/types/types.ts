type Task = {
  id: string;
  text: string;
};

type User = {
  id: string; // `id` プロパティを明示的に追加
  name: string;
  email: string;
  image: string;
  todos?: Task[]; // Optional: ユーザーに紐づくTodoリスト
};

export type { Task, User };
