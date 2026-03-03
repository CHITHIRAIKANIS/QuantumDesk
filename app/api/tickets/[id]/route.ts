import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const ticket = await prisma.ticket.findUnique({
//       where: { id: params.id },
//       include: {
//         messages: {
//           include: {
//             author: true
//           },
//           orderBy: { createdAt: "asc" }
//         }
//       }
//     })

//     if (!ticket) {
//       return NextResponse.json(
//         { error: "Ticket not found" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(ticket)

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }

export async function GET(
  req: Request,
  context: any
) {
  try {
    const { params } = context;
    const { id } = await params; // ✅ IMPORTANT

    const ticketId = Number(id);

    if (isNaN(ticketId)) {
      return NextResponse.json(
        { error: "Invalid ticket id" },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);

  } catch (error) {
    console.error("Ticket Detail Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PATCH(
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