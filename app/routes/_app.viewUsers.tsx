import { Form, useLoaderData } from "@remix-run/react";
import { getAllUsers, deleteUser, updateUser } from "~/data/users";
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
  const actionType = formData.get("actionType");
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  if (typeof userId === "string" && typeof actionType === "string") {
    if (actionType === "delete") {
      await deleteUser(Number(userId), authToken);
    } else if (actionType === "ascend")  {
     const updatedUser = {
        admin: true
      }
      await updateUser(Number(userId), updatedUser, authToken);
    } else if (actionType === "demote") {
      const updatedUser = {
        admin: false
      }
      await updateUser(Number(userId), updatedUser, authToken);
    }
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
                <td className="py-2 flex flex-col lg:flex-row gap-3 text-center px-4 border-b">
                  <Form method="post">
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="actionType" value={user.admin ? "demote" : "ascend"} />
                    <button type="submit" className={`w-full text-white px-4 py-2 rounded ${user.admin ? "bg-yellow-500" : "bg-blue-500"}`}>
                      {user.admin ? "Demote" : "Ascend"}
                    </button>
                  </Form>
                  <Form method="post">
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="actionType" value="delete" />
                    <button type="submit" className="w-full bg-red-500 text-white px-4 py-2 rounded">
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
