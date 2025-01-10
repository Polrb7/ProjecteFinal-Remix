import { Link, Form, useLoaderData } from '@remix-run/react';
import { User } from '~/types/interfaces';
import { getLoggedUser } from '~/data/auth';

export async function loader({ request }: { request: Request }) {
  const user = await getLoggedUser(request);
  return user;
}

const Header: React.FC = () => {
  const user = useLoaderData<User | null>();
  

  return (
    <nav className="bg-black text-gray-100 px-8 py-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Link
            to="/index"
            className="text-2xl md:text-3xl font-extrabold tracking-wide text-center"
          >
            <img
              src="/images/El_llibres.svg"
              alt="El Llibres"
              className="h-12 md:h-16 hover:scale-105 transition-transform duration-200 ease-in-out"
            />
          </Link>
        </div>

        {/* Left Section: Links */}
        <div className="flex items-center space-x-4 md:space-x-10">
          <Link
            to="/index"
            className="text-gray-100 hover:text-white 
            hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
          >
            Main Page
          </Link>

          <Link
            to="/books/add"
            className="text-gray-100 hover:text-white 
            hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
          >
            Add Book
          </Link>

          {/* Condiciona la renderització dels enllaços per a administradors */}
            <>
              <Link
                to="/viewUsers"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
              >
                View Users
              </Link>
              <Link
                to="/viewBooks"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
              >
                View Books
              </Link>
              <Link
                to="/viewReviews"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
              >
                View Reviews
              </Link>
              <Link
                to="/viewComments"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
              >
                View Comments
              </Link>
            </>
        </div>

        {/* Right Section: Profile and Logout */}
        <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
            <>
              <Link
                // to={`viewProfile/${user.id}`}
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
              >
                Profile
              </Link>
              <Form method="post" action="/logout" className="w-full">
                <button
                  type="submit"
                  className="text-gray-100 hover:text-white 
                  hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </Form>
            </>
        </div>
      </div>
    </nav>
  );
}

export default Header;
