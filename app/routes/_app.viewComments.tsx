import { Form, Link, useLoaderData } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getAllComments } from "~/data/comments";
import { Comment } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }
  const comments = await getAllComments(authToken);
  return comments;
}

export default function ViewComments() {
  const comments = useLoaderData<Comment[]>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Review</th>
              <th className="py-2 px-4 border-b">Comment Text</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td className="py-2 text-center px-4 border-b">{comment.id}</td>
                <td className="py-2 text-center px-4 border-b">{comment.user.name} {comment.user.surname}</td>
                <td className="py-2 text-center px-4 border-b">{comment.review_id}</td>
                <td className="py-2 text-center px-4 border-b">{comment.comment}</td>
                <td className="py-2 flex justify-center gap-3 text-center px-4 border-b">
                  <Form method="post" action={`/comments/delete/${comment.id}`}>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
