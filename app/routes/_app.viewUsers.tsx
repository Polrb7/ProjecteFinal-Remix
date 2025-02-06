import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllUsers, deleteUser, updateUser } from "~/data/users";
import { User } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";
import { useState } from "react";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }
  const users = await getAllUsers(authToken);
  return users;
}

const userLoggedRole = true; // Define userLoggedRole

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
  const users = useLoaderData<User[]>(); // Dades dels usuaris carregades
  const [searchResults, setSearchResults] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  // Filtrar usuaris pel nom i cognom
  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const surname = user.surname || "";

    const fullName = `${name} ${surname}`.toLowerCase();
    return fullName.includes(searchResults.toLowerCase());
  });

  return (
    <>

<nav className="bg-black text-gray-100 px-8 py-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Link
            to="/index"
            className="text-2xl md:text-3xl font-extrabold tracking-wide text-center"
          >
            <img
              src="/images/El_llibres.svg"
              alt="El Llibres"
              className="h-12 md:h-16 hover:scale-105 transition-transform duration-200 ease-in-out"
            />
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-100 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>

        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-12 mx-auto">
            <Link
              to="/index"
              className="text-gray-100 hover:text-white 
              hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
            >
              Main Page
            </Link>
            <Link
              to="/books/add"
              className="text-gray-100 hover:text-white 
              hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
            >
              Add Book
            </Link>
            {userLoggedRole == true && (
            <div>
              <Link
                to="/viewUsers"
                className="text-gray-100 hover:text-white mx-2
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Users
              </Link>
              <Link
                to="/viewBooks"
                className="text-gray-100 hover:text-white mx-2
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Books
              </Link>
              <Link
                to="/viewReviews"
                className="text-gray-100 hover:text-white mx-2
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Reviews
              </Link>
              <Link
                to="/viewComments"
                className="text-gray-100 hover:text-white mx-2
                hover:scale-105 hover:bg-gray-800 hover:font-semibold pr-5 hover:px-5 hover:py-5 hover:rounded text-md font-medium transition-colors"
              >
                View Comments
              </Link>
            </div>
          )}
            
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6  ml-5 mt-4 lg:mt-0">
            <Form method="post" action="/logout" className="w-full">
              <button
                type="submit"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </div>
    </nav>

      {/* Input de cerca */}
      <div className="relative w-full mb-4">
        <input
          id="search"
          type="text"
          placeholder="Search users..."
          className="w-full p-2 pl-10 text-lg border border-gray-300 rounded"
          value={searchResults}
          onChange={(e) => setSearchResults(e.target.value)}
        />
      </div>

      {/* Taula d'usuaris */}
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
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-2 text-center px-4 border-b">
                    No users found
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
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
                      <button type="submit" className={`w-full text-white px-4 py-2 rounded ${user.admin ? "bg-yellow-700" : "bg-blue-600"}`}>
                        {user.admin ? "Demote" : "Ascend"}
                      </button>
                    </Form>
                    <Form method="post">
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="actionType" value="delete" />
                      <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded">
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
    </>
  );
}
