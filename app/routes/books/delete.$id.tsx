import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuthToken } from "~/data/auth";
import { deleteBook } from "~/data/books";

// Aquesta funció gestionarà la sol·licitud POST
export async function action({ request, params }: ActionFunctionArgs) {
  // Recuperar el token d'autenticació
  const authToken = await getAuthToken(request);

  // Comprovar si l'usuari està autenticat
  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Obtenir l'ID del llibre de la ruta
  const bookId = params.id;

  if (!bookId) {
    throw new Response("Book ID not provided", { status: 400 });
  }

  // Cridar la funció per eliminar el llibre
  try {
    await deleteBook(bookId, authToken);
    return redirect("/index"); // Redirigir a la llista de llibres després d'eliminar
  } catch (error) {
    throw new Response("Failed to delete book", { status: 500 });
  }
}

export default function DeleteBook() {
  return <p>Deleting book...</p>; // Aquesta vista només s'utilitza si es carrega directament, però normalment no es veu.
}
