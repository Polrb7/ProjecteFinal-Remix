import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllBooks } from "~/data/books";
import { getAuthToken, getLoggedUser } from "~/data/auth";
import { Book } from "~/types/interfaces";
import { useLoaderData, Form, Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs): Promise<{ books: Book[], userId: number | null, userRole: boolean, username: string }> {
  const authToken = await getAuthToken(request);
  const user = await getLoggedUser(request);
  const userId = user.id;
  const userRole = user.admin;
  const username = user.username;

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const books = await getAllBooks(authToken);
  return { books, userId, userRole, username };
}

export default function BookList() {
  const { books, userId, userRole, username } = useLoaderData<{ books: Book[], userId: number | null, userRole: boolean, username: string }>();
console.log(userRole)
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
        Book List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
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
            <h2 className="text-xl font-bold mb-2 text-primaryBlack-default dark:text-primaryWhite-default">
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
              </span><span className="text-sm italic text-gray-500"> By {username}</span>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                 <Link to={`/books/details/${book.id}`}>View Details</Link>
              </button>

              {userId === book.user_id || userRole == true && (
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
        ))}
      </div>
    </div>
  );
}