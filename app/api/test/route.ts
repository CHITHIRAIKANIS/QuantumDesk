import { prisma } from "../../../lib/prisma";

console.log("🚀 route.ts loaded");

export async function GET() {
  console.log("👉 GET function executed");

  await prisma.$queryRaw`SELECT 1`;

  return Response.json({ message: "DB tested" });
}