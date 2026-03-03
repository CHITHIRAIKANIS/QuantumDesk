// import { NextResponse } from "next/server"

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json()
//   const { status } = body

//   // @ts-ignore
//   global.io.to(params.id).emit("ticket_updated", status)

//   return NextResponse.json({ success: true })
// }


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"


export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT

    const ticketId = Number(id);

    if (isNaN(ticketId)) {
      return NextResponse.json(
        { error: "Invalid ticket id" },
        { status: 400 }
      );
    }

    const { status } = await req.json();

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    return NextResponse.json(updatedTicket);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}