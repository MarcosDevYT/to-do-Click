import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        
        userId,
      }
    })

    console.log("task created", task)

    return NextResponse.json(task);

  } catch (error) {
    console.log('ERROR Creating TASK:', error);
    return NextResponse.json({ error: "Error creating TASK", status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    console.log("TASKS: ", tasks)

    return NextResponse.json(tasks);

  } catch (error) {
    console.log('ERROR GETTING TASKS:', error);
    return NextResponse.json({ error: "Error getting Task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {

    const { userId } = await auth();
    const { title, description, date, isCompleted, isImportant, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    })
    
    return NextResponse.json(task);

  } catch (error) {
    console.log('ERROR UPDATING TASK:', error);
    return NextResponse.json({ error: "Error updating Task", status: 500 });
  }
}