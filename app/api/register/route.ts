import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../lib/auth";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return Response.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return Response.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return Response.json({
//       message: "User registered successfully",
//       userId: user.id,
//     });
//   } catch (error) {
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",  // 👈 IMPORTANT
      },
    });

    return Response.json({
      message: "User registered successfully",
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}