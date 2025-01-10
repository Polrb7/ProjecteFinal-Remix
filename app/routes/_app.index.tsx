import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllBooks } from "~/data/books";
import { getAllUsers } from "~/data/users";
import { getAuthToken, getLoggedUser } from "~/data/auth";
import { Book, User } from "~/types/interfaces";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs): Promise<{ books: Book[], users: User[], userLoggedId: number | null, userLoggedRole: boolean }> {
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);
  const userLoggedId = userLogged.id;
  const userLoggedRole = userLogged.admin;

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const users = await getAllUsers(authToken);
  const books = await getAllBooks(authToken);
  return { books, users, userLoggedId, userLoggedRole};
}

export default function BookList() {
  const { books, users, userLoggedId, userLoggedRole } = useLoaderData<{ books: Book[], users: User[], userLoggedId: number | null, userLoggedRole: boolean }>();

  // Estat per al text del cercador
  const [searchText, setSearchText] = useState("");

  // Llibres filtrats segons el text del cercador
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
        Book List
      </h1>

      {/* Input del cercador */}
      <input
        type="text"
        name="buscador"
        id="buscador"
        placeholder="Search..."
        className="w-full p-2 mb-6 border border-gray-300 rounded"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Actualitza l'estat amb el text introduït
      />
      
      {/* Llista de llibres filtrats */}
      <div id="llista" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book: Book) => {
          const user = users.find((user) => user.id === book.user_id);
          return (
            <div
              id="book"
              key={book.id}
              className="bg-white dark:bg-primaryBlack-default p-4 rounded-lg shadow-md"
            >
              {book.book_img ? (
                <img
                  src={book.book_img}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h2 id="title" className="text-xl font-bold mb-2 text-primaryBlack-default dark:text-primaryWhite-default">
                {book.title}
              </h2>
              <p className="text-sm text-primaryWhite-default mb-2">
                Genre: {book.genre}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primaryYellow-default font-bold">
                  Author:
                </span>
                <span className="text-primaryBlack-default dark:text-primaryWhite-default">
                  {book.author}
                </span>
              </div>
              <div className="mt-4 text-right">
                <span className="text-sm italic text-gray-500">
                  Uploaded on {new Date(book.created_at).toLocaleDateString()}
                </span>
                {user && (
                  <span className="text-sm italic text-gray-500"> by {user.username}</span>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                   <Link to={`/books/details/${book.id}`}>View Details</Link>
                </button>
  
                {userLoggedId === book.user_id || userLoggedRole == true && (
                  <>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                      <Link to={`/books/edit/${book.id}`}>Edit</Link>
                    </button>
                    <Form method="post" action={`/books/delete/${book.id}`}>
                      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </Form>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
