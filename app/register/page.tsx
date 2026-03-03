"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [role, setRole] = useState("user");
  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password ,role}),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Registered successfully!");
    router.push("/login");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Register</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border p-2 rounded"
>
  <option value="user">User</option>
  <option value="agent">Agent</option>
</select>
        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column" as const,
  width: "300px",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  cursor: "pointer",
};