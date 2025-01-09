import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllReviews } from "~/data/reviews";
import { Review } from "~/types/interfaces";
import { getAuthToken } from "~/data/auth";

export async function loader({ request }: { request: Request }) {
  const authToken = await getAuthToken(request);
  if (!authToken) {
    throw new Error("Authentication token is missing");
  }
  const reviews = await getAllReviews(authToken);
  return reviews;
}

export default function ViewReviews() {
  const reviews = useLoaderData<Review[]>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 w-auto px-4 border-b">Book</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Review Title</th>
              <th className="py-2 px-4 border-b">Review Text</th>
              <th className="py-2 px-4 border-b">Valoration(1-5)</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="py-2 text-center px-4 border-b">{review.id}</td>
                <td className="py-2 text-center px-4 border-b">{review.book.title}</td>
                <td className="py-2 text-center px-4 border-b">{review.user.name} {review.user.surname}</td>
                <td className="py-2 text-center px-4 border-b">{review.title}</td>
                <td className="py-2 text-center px-4 border-b">{review.text}</td>
                <td className="py-2 text-center px-4 border-b">{review.valoration}</td>
                <td className="py-2 flex justify-center gap-3 text-center px-4 border-b">
                  <>
                    <button className="bg-blue-500 w-auto text-white px-4 py-2 rounded">
                      <Link to={`/reviews/details/${review.id}`}>View Details</Link>
                    </button>
                    <Form method="post" action={`/reviews/delete/${review.id}`}>
                      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </Form>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}