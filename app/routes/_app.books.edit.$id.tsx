import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, Form, useNavigate } from "@remix-run/react";
import { getBookById, updateBook } from "~/data/books";
import { getAuthToken } from "~/data/auth";
import { Book } from "~/types/interfaces";

export async function loader({ request, params }: LoaderFunctionArgs): Promise<Book> {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const bookId = params.id;

  if (!bookId) {
    throw new Response("Book ID not provided", { status: 400 });
  }

  const book = await getBookById(Number(bookId), authToken);

  if (!book) {
    throw new Response("Book not found", { status: 404 });
  }

  return book;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const bookId = params.id;

  if (!bookId) {
    throw new Response("Book ID not provided", { status: 400 });
  }

  const formData = await request.formData();
  const updatedBook = {
    title: formData.get("title") as string,
    genre: formData.get("genre") as string,
    author: formData.get("author") as string,
    book_img: formData.get("image") as string,
    description: formData.get("description") as string,
  };

  try {
    await updateBook(Number(bookId), updatedBook, authToken);
    return redirect("/index");
  } catch (error) {
    throw new Response("Failed to update book", { status: 500 });
  }
}


export default function EditBook() {
  const book = useLoaderData<Book>();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={book.title}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            defaultValue={book.genre}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={book.author}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={book.book_img}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="author">
            Description
          </label>
          <textarea name="description" id="description" className="w-full h-24 p-2 border rounded" defaultValue={book.description}></textarea>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/index")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </Form>
    </div>
  );
}
