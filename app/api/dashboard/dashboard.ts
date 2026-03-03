import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
console.log("Decoded Token:", decoded);
    let tickets;

    if (decoded.role === "user") {
      tickets = await prisma.ticket.findMany({
        where: { createdBy: decoded.id },
        orderBy: { updatedAt: "desc" },
      });
    } else {
      // AGENT
      tickets = await prisma.ticket.findMany({
        orderBy: { updatedAt: "desc" },
      });
    }
console.log("Decoded Token:", decoded);
    return NextResponse.json(tickets);

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 500 }
    );
  }
}