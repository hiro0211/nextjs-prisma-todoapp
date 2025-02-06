import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { text, userId } = await req.json();
  console.log(text);
  if (!text || !userId) {
    return NextResponse.json({ error: "無効なデータ形式です" }, { status: 400 });
  }
  const todo = await prisma.todo.create({
    data: {
      text, userId
    },
  });
  return NextResponse.json(todo);
}

export async function PUT(req: NextRequest) {
  const { id, text } = await req.json();
  const updateTodo = await prisma.todo.update({
    where: {
      id: id as string,
    },
    data: {
      text,
    },
  });
  return NextResponse.json(updateTodo);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const deleteTodo = await prisma.todo.delete({
    where: {
      id: id as string,
    },
  });
  return NextResponse.json(deleteTodo);
}