import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: any
) {
  try {
    const { params } = context;
    const { id } = await params;

    const ticketId = Number(id);

    if (isNaN(ticketId)) {
      return NextResponse.json(
        { error: "Invalid ticket id" },
        { status: 400 }
      );
    }

    const { body, authorId } = await req.json();

    if (!body || !authorId) {
      return NextResponse.json(
        { error: "Message body and authorId required" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        content: body,
        ticketId: ticketId,
        senderId: Number(authorId),
      },
      include: {
        sender: true,
      },
    });

    // Optional: update ticket updatedAt
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(newMessage, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}