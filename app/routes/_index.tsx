import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

// export const loader = async () => {
//   return redirect("/login");
// };

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4 text-indigo-700">EL Llibres</h1>
        <h2 className="text-2xl mb-8 text-gray-800">Benvingut a la nostra aplicació!</h2>
        <p className="text-lg mb-8 text-gray-700">
          Explora una gran col·lecció de llibres i troba els teus favorits. Uneix-te a la nostra comunitat avui mateix!
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}