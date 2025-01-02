import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [activeForm, setActiveForm] = useState<"login" | "register" | null>(
    null
  );

  const handleFormClose = () => setActiveForm(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Header amb botons */}
      <header className="flex justify-end p-4">
        <button
          className="mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setActiveForm("login")}
        >
          Login
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => setActiveForm("register")}
        >
          Register
        </button>
      </header>

      {/* Formulari de Login */}
      {activeForm === "login" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulari de Register */}
      {activeForm === "register" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-md bg-gray-100 p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="surname"
                >
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your surname"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your age"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Enter your password again"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contingut principal */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <header className="flex flex-col items-center gap-9">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span className="sr-only">Remix</span>
            </h1>
            <div className="h-[144px] w-[434px]">
              <img
                src="/logo-light.png"
                alt="Remix"
                className="block w-full dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="Remix"
                className="hidden w-full dark:block"
              />
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
