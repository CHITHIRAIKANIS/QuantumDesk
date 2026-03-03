"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

// const handleLogin = async (e: React.FormEvent) => {

//   try {
//     e.preventDefault();   // 🔥 VERY IMPORTANT
//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
// debugger;
//     const data = await res.json();
// debugger;
//     if (!res.ok) {
//       alert(data.error);
//       return;
//     }
//  // Save token
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("role", data.user.role);
//     localStorage.setItem("userId", data.user.id);
//     //alert("Login successful!");
//     if (data.user.role === "agent") {
//   router.push("/dashboard");
// } else {
//   router.push("/user-dashboard");
// }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Failed to fetch");
//   }
// };

const handleLogin = async (e: React.FormEvent) => {
  try {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);

      // 🔥 If user not found → redirect to register
      if (res.status === 404) {
        router.push("/register");
      }

      return;
    }

    // Save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("userId", data.user.id);

    // Role-based redirect (IMPORTANT FIX 👇)

    if (data.user.role.toUpperCase() === "AGENT") {
      router.push("/dashboard");
    } else {
      router.push("/user-dashboard");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Failed to fetch");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}