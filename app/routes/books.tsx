// app/routes/books.tsx

import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllBooks } from "~/data/books";
import { getAuthToken } from "~/data/auth";
import { Book } from "~/types/interfaces";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs): Promise<Book[]> {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const books = await getAllBooks(authToken);
  return books;
}

export default function BookList() {
  const books = useLoaderData<Book[]>();

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
              {book.description.slice(0, 100)}...
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
