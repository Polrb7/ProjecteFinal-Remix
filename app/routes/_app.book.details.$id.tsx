import { LoaderFunctionArgs } from '@remix-run/node';
import { getBookById } from '~/data/books';
import { getAuthToken } from '~/data/auth';
import { Book } from '~/types/interfaces';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params, request }: LoaderFunctionArgs): Promise<Book | null> {
  const authToken = await getAuthToken(request);

  if (!authToken) {
    throw new Response('Unauthorized', { status: 401 });
  }

  const bookId = parseInt(params.id as string, 10);
  const book = await getBookById(bookId, authToken);

  if (!book) {
    throw new Response('Book not found', { status: 404 });
  }

  return book;
}

export default function BookDetails() {
  const book = useLoaderData<Book>();

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6 rounded-lg dark:bg-primaryBlack-default drop-shadow-lg">
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
          <p className="text-primaryWhite-default mt-2">
            {book.description}
          </p>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-primaryYellow-default font-bold text-sm">
                Author:
              </span>{' '}
              <span className="font-medium text-primaryBlack-default dark:text-primaryWhite-default">
                {book.author}
              </span>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="text-primaryYellow-default font-bold text-sm">
                Uploaded At:
              </span>{' '}
              <span className="font-medium text-primaryBlack-default dark:text-primaryWhite-default">
                {new Date(book.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}