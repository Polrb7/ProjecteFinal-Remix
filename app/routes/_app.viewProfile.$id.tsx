import { Link, redirect, useLoaderData } from "@remix-run/react";
import { getUserById, updateUser } from "~/data/users";
import { User } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";
import { ActionFunctionArgs } from "@remix-run/node";

// Loader per obtenir l'usuari per ID
export async function loader({ request, params }: { request: Request, params: { id: string } }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  const userId = params.id;

  if (!userId) {
    throw new Response("User ID not found", { status: 400 });
  }

  const user = await getUserById(Number(userId), authToken);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return user;
}

// Action per actualitzar l'usuari
export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userId = params.id;

  if (!userId) {
    throw new Response("User ID not provided", { status: 400 });
  }

  const formData = await request.formData();
  const updatedUser = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    username: formData.get("username") as string,
    age: Number(formData.get("age") as string),
    email: formData.get("email") as string,
  };

  console.log("Updated user data:", updatedUser); // DEBUG: Comprovar dades enviades

  try {
    await updateUser(Number(userId), updatedUser, authToken);
    return redirect(`/index`);
  } catch (error) {
    console.error("Error updating user:", error); // DEBUG: Mostrar errors
    throw new Response("Failed to update user", { status: 500 });
  }
}

// Component per mostrar i modificar l'usuari
export default function UserProfile() {
  const user = useLoaderData<User>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <form method="post" className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Surname:</label>
          <input
            type="text"
            name="surname"
            defaultValue={user.surname}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            defaultValue={user.age}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <br />
        <button
          type="submit"
          className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
