import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}

/* ✅ Add proper type here */
type TokenPayload = {
  id: number;
  email: string;
  role: string;
};

export function generateToken({ id, email, role }: TokenPayload) {
  return jwt.sign({ id, email, role }, JWT_SECRET, {
    expiresIn: "1d",
  });
}