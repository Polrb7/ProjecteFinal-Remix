import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuthToken } from "~/data/auth";
import { deleteLike } from "~/data/likes";

export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const likeID = params.id;

  if (!likeID) {
    throw new Response("Like ID not provided", { status: 400 });
  }

  try {
    await deleteLike(Number(likeID), authToken);
    const referer = request.headers.get("Referer") || "/"; // Get the previous page from the Referer header
    return redirect(referer); // Redirect to the previous page
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw new Response("Failed to delete book", { status: 500 });
  }
}