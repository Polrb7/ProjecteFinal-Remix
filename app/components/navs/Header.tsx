import { Link, Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { User } from '~/types/interfaces';
import { getLoggedUser } from '~/data/auth';

export async function loader({ request }: { request: Request }) {
  const user = await getLoggedUser(request);
  return user;
}

const Header: React.FC = () => {
  const user = useLoaderData<User | null>();
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-100 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>

        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-12">
            <Link
              to="/index"
              className="text-gray-100 hover:text-white 
              hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
            >
              Main Page
            </Link>
            <Link
              to="/books/add"
              className="text-gray-100 hover:text-white 
              hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
            >
              Add Book
            </Link>
            <>
              <Link
                to="/viewUsers"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Users
              </Link>
              <Link
                to="/viewBooks"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Books
              </Link>
              <Link
                to="/viewReviews"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                View Reviews
              </Link>
              <Link
                to="/viewComments"
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold pr-5 hover:px-5 hover:py-5 hover:rounded text-md font-medium transition-colors"
              >
                View Comments
              </Link>
            </>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
            <>
              <Link
                to={`viewProfile/${user?.id}`}
                className="text-gray-100 hover:text-white 
                hover:scale-105 hover:bg-gray-800 hover:font-semibold pl-5 hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
              >
                Profile
              </Link>
              <Form method="post" action="/logout" className="w-full">
                <button
                  type="submit"
                  className="text-gray-100 hover:text-white 
                  hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-md font-medium transition-colors"
                >
                  Logout
                </button>
              </Form>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
