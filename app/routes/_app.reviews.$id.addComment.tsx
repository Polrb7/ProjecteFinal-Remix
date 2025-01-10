import { redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { addComment } from "~/data/comments";
import { getAuthToken, getLoggedUser } from "~/data/auth";

export async function action({ request, params }: { request: Request, params: { id: string } }) {
  const formData = await request.formData();
  const comment = formData.get("comment");
  const reviewId = params.id;
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  if (typeof comment === "string" && reviewId && userLogged) {
    const newComment = {
      comment,
      review_id: Number(reviewId),
      user_id: userLogged.id,
    };
    await addComment(newComment, authToken);
  }

  return redirect(`/reviews/details/${reviewId}`);
}

export default function AddComment() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Comment</h1>
      <Form method="post" className="bg-white p-6 rounded shadow-md">
        <textarea
          name="comment"
          rows={4}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Write your comment here..."
          required
        ></textarea>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <a
            href={`/reviews/details/${id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </a>
        </div>
      </Form>
    </div>
  );
}
