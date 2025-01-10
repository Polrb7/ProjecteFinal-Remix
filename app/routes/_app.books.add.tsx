import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { addBook } from "~/data/books";
import { getAuthToken, getLoggedUser } from "~/data/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");
  const genre = formData.get("genre");
  const book_img = formData.get("book_img");
  const description = formData.get("description");
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  const newBook = {
    title: String(title),
    author: String(author),
    genre: String(genre),
    book_img: String(book_img),
    description: String(description),
    user_id: Number(userLogged.id),
  };

  await addBook(newBook, authToken);

  return redirect("/index");
}

export default function AddBook() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>
      <Form method="post" className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          name="author"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="genre"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Genre"
          required
        />
        <input
          type="text"
          name="book_img"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Image URL"
        />
        <textarea 
        name="description" 
        id="description" 
        placeholder="Description" 
        className="w-full h-24 border border-gray-300 rounded p-2 mb-4" 
        required>
        </textarea>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <a
            href="/books"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </a>
        </div>
      </Form>
    </div>
  );
}
