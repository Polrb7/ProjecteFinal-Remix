import { LoaderFunctionArgs } from "@remix-run/node";
import { getBookById } from "~/data/books";
import { getAuthToken } from "~/data/auth";
import { Book } from "~/types/interfaces";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<Book | null> {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const bookId = parseInt(params.id as string, 10); // Converteix l'id a número
  if (isNaN(bookId)) {
    throw new Response("Invalid book ID", { status: 400 });
  }

  const book = await getBookById(bookId, authToken);
  if (!book) {
    throw new Response("Book not found", { status: 404 });
  }

  return book;
}

export default function BookDetails() {
  const book = useLoaderData<Book>();

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Description: {book.description}</p>
      <p>Uploaded by: {book.user.name} {book.user.surname}</p>
    </div>
  );
}
