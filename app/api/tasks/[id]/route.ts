import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Aquí cambiamos la firma para aceptar el tipo correctamente
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    const { id } = context.params; 

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

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
