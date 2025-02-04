import { type } from "os";

type User ={
  id: string;
  name: string;
  email: string;
  image: string;
  todos?: Todo[];
}

type Todo = {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date; 
  user: User;
};