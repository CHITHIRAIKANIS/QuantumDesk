import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuantumDesk</h1>
        <div className="space-x-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Ticket Management System
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl">
          Manage customer tickets, assign agents, track status,
          and communicate in real-time with internal notes support.
        </p>

        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/create-ticket"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Create Ticket
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-3 text-sm">
        © 2026 QuantumDesk Mini Project
      </footer>
    </div>
  );
}