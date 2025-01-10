import { useLoaderData, Link } from "@remix-run/react";
import { getReviewById } from "~/data/reviews";
import { getAllComments } from "~/data/comments";
import { getAllUsers } from "~/data/users";
import { Review, Comment, User } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";

export async function loader({ params, request }: { params: { id: string }, request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  const reviewId = params.id;

  if (!reviewId) {
    throw new Response("Review ID not provided", { status: 400 });
  }

  const review = await getReviewById(Number(reviewId), authToken);
  if (!review) {
    throw new Response("Review not found", { status: 404 });
  }

  const users = await getAllUsers(authToken);
  const comments = await getAllComments(authToken);

  return { review, comments, users };
}

export default function ReviewDetails() {
  const { review, comments, users } = useLoaderData<{ review: Review, comments: Comment[], users: User[] }>();

  return (
    <div className="container text-black mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Review Details</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl text-black font-bold mb-4">{review.title}</h2>
        <p className="mb-2"><strong>Valoration:</strong> {review.valoration}</p>
        <p className="mb-4"><strong>Review Text:</strong> {review.text}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          <Link to={`/reviews/${review.id}/addComment`}>Add Comment</Link>
        </button>

      </div>
      <div className="bg-white p-6 rounded shadow-md mt-6">
        <h2 className="text-2xl text-black font-bold mb-4">Comments</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              comment.review_id === review.id && (
                <li key={comment.id} className="mb-4">
                  <p>
                    <strong>
                      {users.find((user) => user.id === comment.user_id)?.username || "Unknown User"}:
                    </strong> {comment.comment}
                  </p>
                </li>
              )
            ))}
          </ul>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
}