import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  const id = req.nextUrl.pathname.split('/').pop();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    console.log("TASK DELETED", task);
    return NextResponse.json(task);

  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting Task", status: 500 });
  }
}

