import { redirect } from "@remix-run/node";
import { deleteUser } from "~/data/users";
import { getAuthToken } from "~/data/auth";

export async function action({ params, request }: { params: { id: string }, request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Error("Authentication token is missing");
  }

  const userId = params.id;

  if (!userId) {
    throw new Error("User ID not provided", {status: 400});
  }

  try {
    await deleteUser(Number(userId), authToken);
    const rerferer = request.headers.get("Referer") || "/";
    return redirect(rerferer);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user", {status: 500});
  }
}
