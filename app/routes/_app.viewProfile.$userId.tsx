// routes/viewProfile.$userId.tsx
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuthToken } from "~/data/auth";
import { getAllBooks } from "~/data/books";
import { getUserReviews } from "~/data/reviews";
import { getUserById } from "~/data/users";
import { Book, Review, User } from "~/types/interfaces";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<{ user: User; books: Book[]; reviews: Review[] }> {
    const authToken = await getAuthToken(request);
  
    if (!authToken) {
      throw new Response("Unauthorized", { status: 401 });
    }
  
    const userId = params.userId;
    if (!userId) {
      throw new Response("User ID not provided", { status: 400 });
    }
  
    const user = await getUserById(Number(userId), authToken);
    if (!user) {
      throw new Response("User not found", { status: 404 });
    }
  
    const books = await getAllBooks(authToken);
    const userBooks = books.filter((book) => book.user_id === parseInt(userId));
  
    const reviews = await getUserReviews(userId, authToken);
  
    return { user, books: userBooks, reviews };
  }

  export default function UserProfile() {
    const { user, books, reviews } = useLoaderData<{ user: User; books: Book[]; reviews: Review[] }>();
  
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
          <p>
            <strong>Full Name:</strong> {user.name} {user.surname}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Books Published</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600">Genre: {book.genre}</p>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">
              Uploaded on {new Date(book.created_at).toLocaleDateString()}
            </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No books published by this user.</p>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4">Reviews Written</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">
                  <strong>Book:</strong> {review.title}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Rating:</strong> {review.valoration}/5
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Comment:</strong> {review.text}
                </p>
                <p className="text-sm text-gray-400">
                  Reviewed on {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No reviews written by this user.</p>
          )}
        </div>
      </div>
    );
  }
  
