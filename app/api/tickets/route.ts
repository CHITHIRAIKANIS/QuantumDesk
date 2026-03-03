import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

import jwt from "jsonwebtoken";


function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  createdBy: z.number()
})

export async function POST(req: Request) {
  try {
    console.log("POST /api/tickets hit chitraaaa")
    const user = verifyToken(req);
if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}
    const body = await req.json()
    const parsed = createSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description, 
        createdBy: parsed.data.createdBy
      }
    })
    console.log("ticket created successfullyy.... chitraaaa")

    return NextResponse.json(ticket, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    let tickets;

    if (decoded.role === "user") {
      tickets = await prisma.ticket.findMany({
        where: { createdBy: decoded.id },
        orderBy: { updatedAt: "desc" },
      });
    } else {
      tickets = await prisma.ticket.findMany({
        orderBy: { updatedAt: "desc" },
      });
    }

    return NextResponse.json(tickets);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}


// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = Number(params.id); // ✅ convert to number

//     if (!id) {
//       return NextResponse.json(
//         { error: "Invalid ticket id" },
//         { status: 400 }
//       );
//     }

//     const ticket = await prisma.ticket.findUnique({
//       where: { id },
//       include: {
//         messages: {
//           include: {
//             author: true,
//           },
//           orderBy: { createdAt: "asc" },
//         },
//       },
//     });

//     if (!ticket) {
//       return NextResponse.json(
//         { error: "Ticket not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(ticket);

//   } catch (error) {
//     console.error("Ticket Detail Error:", error);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(req: Request) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { ticketId, status } = body;

  if ((user as any).role !== "agent") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

