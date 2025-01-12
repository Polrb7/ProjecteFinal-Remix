import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { addLike } from "~/data/likes";
import { getAuthToken, getLoggedUser } from "~/data/auth";

export async function action({ request, params }: ActionFunctionArgs) {
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  const newLike = {
    user_id: Number(userLogged.id),
    book_id: Number(params.id),
  };

  try {
      await addLike(newLike, authToken);
      const referer = request.headers.get("Referer") || "/"; // Get the previous page from the Referer header
      return redirect(referer); // Redirect to the previous page
    } catch (error) {
      console.error("Failed to add like:", error);
      throw new Response("Failed to add like", { status: 500 });
    }
}