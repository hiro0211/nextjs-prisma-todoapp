import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { text, userId } = body;

    if (!text || !userId) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    console.log("ユーザーIDは", userId);
    console.log("テキストは", text);

    // ユーザーが存在するか確認
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const todo = await prisma.todo.create({
      data: { text, userId },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, text } = await req.json();
    if (!id || !text) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id as string,
      },
      data: {
        text,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(deletedTodo);
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
