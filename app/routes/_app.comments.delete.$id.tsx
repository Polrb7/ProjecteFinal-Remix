import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuthToken } from "~/data/auth";
import { deleteComment } from "~/data/comments";

export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const commentId = params.id;

  if (!commentId) {
    throw new Response("Comment ID not provided", { status: 400 });
  }

  try {
    await deleteComment(Number(commentId), authToken);
    const referer = request.headers.get("Referer") || "/"; // Get the previous page from the Referer header
    return redirect(referer); // Redirect to the previous page
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw new Response("Failed to delete comment", { status: 500 });
  }
}