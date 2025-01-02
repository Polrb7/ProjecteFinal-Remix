import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Tipus per als llibres (pots modificar-los segons el que retorna l'API)
type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  book_img: string;
};

// Loader per obtenir els llibres des de l'API
export const loader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:8083/api/books");
  if (!response.ok) {
    throw new Error("No s'han pogut carregar els llibres");
  }
  const books: Book[] = await response.json();
  return books;
};

// Component principal de la pàgina
export default function BooksPage() {
  const books = useLoaderData<Book[]>(); // Dades del loader

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Llibres Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

// Component per mostrar cada llibre
function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={book.book_img}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-gray-600">Autor: {book.author}</p>
        <p className="text-sm text-gray-500">Gènere: {book.genre}</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {book.description}
        </p>
      </div>
    </div>
  );
}
