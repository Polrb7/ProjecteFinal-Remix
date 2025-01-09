import { Form, useLoaderData } from "@remix-run/react";
import { getAllUsers, deleteUser } from "~/data/users";
import { User } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }
  const users = await getAllUsers(authToken);
  return users;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  if (typeof userId === "string") {
    await deleteUser(Number(userId), authToken);
  }

  return null;
}

export default function ViewUsers() {
  const users = useLoaderData<User[]>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Surname</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 text-center px-4 border-b">{user.id}</td>
                <td className="py-2 text-center px-4 border-b">{user.name}</td>
                <td className="py-2 text-center px-4 border-b">{user.surname}</td>
                <td className="py-2 text-center px-4 border-b">{user.username}</td>
                <td className="py-2 text-center px-4 border-b">{user.email}</td>
                <td className="py-2 text-center px-4 border-b">{user.age}</td>
                <td className="py-2 flex justify-center gap-3 text-center px-4 border-b">
                  {user.admin == true ? (
                    <button className="bg-yellow-500 w-auto text-white px-4 py-2 rounded">
                      Demote
                    </button>
                  ) : (
                    <button className="bg-blue-500 w-auto text-white px-4 py-2 rounded">
                      Ascend
                    </button>
                  )}
                  <Form method="post" action={`/users/delete/${user.id}`}>
                      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
