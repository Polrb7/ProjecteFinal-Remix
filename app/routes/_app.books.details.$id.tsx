import { LoaderFunctionArgs } from "@remix-run/node";
import { getBookById } from "~/data/books";
import { getReviewsByBookId } from "~/data/reviews";
import { getAuthToken } from "~/data/auth";
import { Book, Review, User } from "~/types/interfaces";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { getAllUsers } from "~/data/users";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<{ book: Book, filteredReviews: Review[], reviews: Review[], users: User[] }> {
  const authToken = await getAuthToken(request);

  // Comprova si hi ha token d'autenticació
  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Comprova si l'ID del llibre és vàlid
  const bookId = parseInt(params.id as string, 10);
  if (isNaN(bookId)) {
    throw new Response("Invalid book ID", { status: 400 });
  }

  // Obté el llibre pel seu ID
  const book = await getBookById(bookId, authToken);
  if (!book) {
    throw new Response("Book not found", { status: 404 });
  }

  // Obté tots els usuaris
  const users = await getAllUsers(authToken);

  // Obté les reviews i garanteix que és un array
  const reviews = (await getReviewsByBookId(bookId, authToken)) || [];
  if (!Array.isArray(reviews)) {
    console.error("Unexpected reviews format:", reviews);
    throw new Error("Expected reviews to be an array");
  }

  // Filtra les reviews que pertanyen a aquest llibre
  const filteredReviews = reviews.filter(review => review.book_id === bookId);

  return { book, filteredReviews, reviews, users };
}

export default function BookDetails() {
  const { book, filteredReviews, reviews, users } = useLoaderData<{ book: Book, filteredReviews: Review[], reviews: Review[], users: User[] }>();

  return (
    
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg dark:bg-primaryBlack-default drop-shadow-lg">
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
        {book.book_img ? (
          <img
            src={book.book_img}
            alt={book.title}
            className="w-64 h-64 object-cover rounded-lg md:mr-6 mb-4 md:mb-0"
          />
        ) : (
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 md:mr-6 mb-4 md:mb-0">
            No Image
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primaryBlack-default dark:text-primaryYellow-default">
              {book.title}
            </h1>
            <p className="bg-gray-600 justify-self-center mt-2 rounded-md px-2 py-1 text-xs italic text-white">
              {book.genre}
            </p>
          </div>
          <hr className="text-primaryYellow-default" />
          <p className="text-primaryWhite-default mt-2">{book.description}</p>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-primaryYellow-default font-bold text-sm">Author:</span>{' '}
              <span className="font-medium text-primaryBlack-default dark:text-primaryWhite-default">
                {book.author}
              </span>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="text-primaryYellow-default font-bold text-sm">Uploaded At:</span>{' '}
              <span className="font-medium text-primaryBlack-default dark:text-primaryWhite-default">
                {new Date(book.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          <Link to={`/books/${book.id}/addReview`}>Add Review</Link>
        </button>

      <div className="bg-white p-6 rounded shadow-md mt-6">
        <h2 className="text-2xl text-black font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {filteredReviews.map((review) => (
            <><li key={review.id} className="mb-4">
                <h3 className="text-lg font-bold">{review.title}</h3>
                <p>
                  <strong>Valoration:</strong> {review.valoration}
                </p>
                <p>
                  <strong>Review Text:</strong> {review.text}
                </p>
                <p>
                  <strong>Reviewed by:</strong> {users.find((user) => user.id === review.user_id)?.username || "Unknown User"}
                </p>
              </li><>
                  <button className="bg-blue-600 w-auto text-white px-4 py-2 rounded">
                    <Link to={`/reviews/details/${review.id}`}>View Details</Link>
                  </button>
                </></>
          ))}
          </ul>
        ) : (
          <p>No Reviews available.</p>
        )}
      </div>
    </div>
  );
}
