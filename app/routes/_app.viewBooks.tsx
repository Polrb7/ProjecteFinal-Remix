import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllBooks } from "~/data/books";
import { Book } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Error("Authentication token is missing");
  }
  const books = await getAllBooks(authToken);
  return books;
}

export default function ViewBooks() {
  const books = useLoaderData<Book[]>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Genre</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="py-2 text-center px-4 border-b">{book.id}</td>
              <td className="py-2 text-center px-4 border-b">{book.title}</td>
              <td className="py-2 text-center px-4 border-b">{book.author}</td>
              <td className="py-2 text-center px-4 border-b">{book.genre}</td>
              <td className="py-2 flex justify-center gap-3 text-center px-4 border-b">
              <>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    <Link to={`/books/details/${book.id}`}>View Details</Link>
                  </button>
                  <Form method="post" action={`/books/delete/${book.id}`}>
                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                  </Form>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
