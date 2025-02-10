import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllBooks } from "~/data/books";
import { getAllUsers } from "~/data/users";
import { getAllLikes } from "~/data/likes";
import { getAuthToken, getLoggedUser } from "~/data/auth";
import { Book, User, Like } from "~/types/interfaces";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { useState } from "react";
import Modal from "~/components/utils/Modal";
import { FaHeart } from "react-icons/fa";

export async function loader({ request }: LoaderFunctionArgs): Promise<{ books: Book[], users: User[], likes: Like[], userLoggedId: number | null, userLoggedRole: boolean, authToken: string }> {
  const authToken = await getAuthToken(request);
  const userLogged = await getLoggedUser(request);
  const userLoggedId = userLogged.id;
  const userLoggedRole = userLogged.admin;

  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const users = await getAllUsers(authToken);
  const books = await getAllBooks(authToken);
  const likes = await getAllLikes(authToken);
  return { books, users, likes, userLoggedId, userLoggedRole, authToken };
}

export default function BookList() {
  const { books, users, likes: initialLikes, userLoggedId, userLoggedRole } = useLoaderData<{ books: Book[], users: User[], likes: Like[], userLoggedId: number | null, userLoggedRole: boolean }>();
  const [likes, setLikes] = useState<Like[]>(initialLikes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const openModal = (bookId: number) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const confirmDelete = () => {
    if (selectedBookId !== null) {
      (document.getElementById(`delete-form-${selectedBookId}`) as HTMLFormElement)?.submit();
    }
    closeModal();
  };

  // Estat per al text del cercador i gènere
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Filtrar llibres al fer clic al botó
  const [filteredBooks, setFilteredBooks] = useState(books);

  const applyFilter = () => {
    console.log("Apply filter clicked"); // Depuració
    const newFilteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedGenre === "" || book.genre === selectedGenre)
    );
    console.log("Filtered books:", newFilteredBooks); // Depuració
    setFilteredBooks(newFilteredBooks);
  };
  

  // Obtenir tots els gèneres únics
  const genres = Array.from(new Set(books.map((book) => book.genre)));

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="flex justify-end">
          <Link
            to={`/viewProfile/${userLoggedId}`}
            className="text-black hover:scale-105 hover:bg-gray-300 hover:font-semibold pl-5 hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
          >
            Profile
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
          Book List
        </h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          {/* Input del cercador */}
          <input
            type="text"
            name="buscador"
            id="buscador"
            placeholder="Search..."
            className="flex-1 p-2 border border-gray-300 rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Dropdown per seleccionar el gènere */}
          <div className="flex-1 flex items-center">
            <label htmlFor="genre">Genre: </label>
            <select
              name="genre"
              id="genre"
              className="flex-1 p-2 border border-gray-300 rounded"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Botó per aplicar el filtratge */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={applyFilter}
          >
            Filter
          </button>
        </div>

        {/* Llista de llibres filtrats */}
        <div id="llista" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book: Book) => {
            const user = users.find((user) => user.id === book.user_id);
            const userLike = likes.find((like) => like.book_id === book.id && like.user_id === userLoggedId);
            return (
              <div
                id="book"
                key={book.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Link to={`/books/details/${book.id}`}>
                  {book.book_img ? (
                    <img
                      src={book.book_img}
                      alt={book.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <h2 id="title" className="text-xl font-bold mb-2 text-primaryBlack-default dark:text-primaryWhite-default">
                    {book.title}
                  </h2>
                  <p className="text-sm text-primaryWhite-default mb-2">
                    Genre: {book.genre}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primaryYellow-default font-bold">
                      Author:
                    </span>
                    <span className="text-primaryBlack-default dark:text-primaryWhite-default">
                      {book.author}
                    </span>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-sm italic text-gray-500">
                      Uploaded on {new Date(book.created_at).toLocaleDateString()}
                    </span>
                    {user && (
                      <Link
                        to={`/viewProfile/${user.id}`}
                        className="text-sm italic text-gray-500 underline hover:text-blue-700"
                      >
                        by {user.username}
                      </Link>
                    )}
                  </div>
                </Link>
                <div className="mt-4 flex justify-evenly flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded">
                    <Link to={`/books/details/${book.id}`}>View Details</Link>
                  </button>

                  {(userLoggedId === book.user_id || userLoggedRole) && (
                    <>
                      <button className="bg-yellow-700 text-white px-4 py-2 rounded">
                        <Link to={`/books/edit/${book.id}`}>Edit</Link>
                      </button>
                      <Form method="post" action={`/books/delete/${book.id}`} id={`delete-form-${book.id}`}>
                        <button
                          type="button"
                          className="bg-red-600 w-full text-white px-4 py-2 rounded"
                          onClick={() => openModal(book.id)}
                        >
                          Delete
                        </button>
                      </Form>
                    </>
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  {userLike ? (
                    <Form method="post" action={`/likes/delete/${userLike.id}`}>
                      <button aria-label="like" type="submit">
                        <FaHeart className={"text-red-500 cursor-pointer"} />
                      </button>
                    </Form>
                  ) : (
                    <Form method="post" action={`/likes/add/${book.id}`}>
                      <button aria-label="like" type="submit">
                        <FaHeart className={"text-gray-400 cursor-pointer"} />
                      </button>
                    </Form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
        >
          Are you sure you want to delete this book?
        </Modal>
      </div>
    </>
  );
}
