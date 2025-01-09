import { redirect } from "@remix-run/node";
import { deleteReview } from "~/data/reviews";
import { getAuthToken } from "~/data/auth";

export async function action({ params, request }: { params: { id: string }, request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Error("Authentication token is missing");
  }

  const reviewId = params.id;

  if (!reviewId) {
    throw new Error("Review ID not provided", {status: 400});
  }

  try {
    await deleteReview(Number(reviewId), authToken);
    const rerferer = request.headers.get("Referer") || "/";
    return redirect(rerferer);
  } catch (error) {
    console.error("Failed to delete review:", error);
    throw new Error("Failed to delete review", {status: 500});
  }
}
