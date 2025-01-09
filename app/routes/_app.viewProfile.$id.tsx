import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/data/users";
import { User } from "~/types/interfaces";
import { getAuthToken, getLoggedUser } from "~/data/auth";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  const userId = await getLoggedUser(authToken); // Correct function to get user ID from token

  if (!userId) {
    throw new Response("User ID not found", { status: 400 });
  }

  const user = await getUserById(userId, authToken);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return user;
}

export default function UserProfile() {
  const user = useLoaderData<User>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Surname:</strong> {user.surname}</p>
        <p className="mb-2"><strong>Username:</strong> {user.username}</p>
        <p className="mb-2"><strong>Age:</strong> {user.age}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
}
