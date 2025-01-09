import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuthToken } from "~/data/auth";
import { deleteBook } from "~/data/books";

export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const bookId = params.id;

  if (!bookId) {
    throw new Response("Book ID not provided", { status: 400 });
  }

  try {
    await deleteBook(Number(bookId), authToken);
    const referer = request.headers.get("Referer") || "/"; // Get the previous page from the Referer header
    return redirect(referer); // Redirect to the previous page
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw new Response("Failed to delete book", { status: 500 });
  }
}