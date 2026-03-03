import { prisma } from "../../../lib/prisma";
import { comparePassword, generateToken } from "../../../lib/auth";

// export async function POST(req: Request) {
//   console.log("🔥 Login API called");

//   const { email, password } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return Response.json({ error: "User not found" }, { status: 400 });
//   }

//   // ✅ Use your existing compare function
//   const isMatch = await comparePassword(password, user.password);

//   if (!isMatch) {
//     return Response.json({ error: "Invalid password" }, { status: 400 });
//   }

//   // ✅ Use your existing token generator
//   const token = generateToken({
//     id: user.id,
//     email: user.email,
//     role: user.role,
//   });

//   return Response.json({
//     message: "Login successful",
//     token,
//     user: {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       name: user.name,
//     },
//   });
// }

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return Response.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}