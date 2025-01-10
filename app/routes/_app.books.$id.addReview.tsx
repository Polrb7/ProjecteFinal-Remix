import { redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { createReview } from "~/data/reviews";
import { getAuthToken, getLoggedUser } from "~/data/auth";

export async function action({ request, params }: { request: Request, params: { id: string } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const text = formData.get("text");
  const valoration = formData.get("valoration");
  const bookId = params.id;
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);

  if (!authToken) {
    throw new Response("Authentication token is missing", { status: 401 });
  }

  if (typeof title === "string" && typeof text === "string" && typeof valoration === "string" && bookId && userLogged) {
    const newReview = {
      title,
      text,
      valoration: Number(valoration),
      book_id: Number(bookId),
      user_id: userLogged.id,
    };
    await createReview(newReview, authToken);
  }

  return redirect(`/books/details/${bookId}`);
}

export default function AddReview() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Review</h1>
      <Form method="post" className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Review Title"
          required
        />
        <textarea
          name="text"
          rows={4}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Write your review here..."
          required
        ></textarea>
        <input
          type="number"
          name="valoration"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <a
            href={`/books/details/${id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </a>
        </div>
      </Form>
    </div>
  );
}
