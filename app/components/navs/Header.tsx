import { Link } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import { User } from '~/types/interfaces'

const Header: React.FC = () => {
    // const data = useLoaderData<{
    //     user: User;
    //   }>();

    //   const username = data.user.username;

	return (
		<nav className="bg-black text-gray-100 px-8 py-5 shadow-lg">
			<div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
				<div className="flex-shrink-0 mx-auto md:mx-0">
					<Link
						to="/index"
						className="text-2xl md:text-3xl font-extrabold tracking-wide text-center "
					>
						{/* <img
							src="/images/El-llibres.svg"
							alt="El Llibres"
							className="h-12 md:h-16 hover:scale-105 transition-transform duration-200 ease-in-out"
						/> */}
					</Link>
				</div>

				{/* Left Section: Links */}
				<div className="flex items-center space-x-4 md:space-x-10">
					<Link
						to="/books"
						className="text-gray-100 hover:text-white 
                        hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
					>
						Books
					</Link>
					<Link
						to="/reviews"
						className="text-gray-100 hover:text-white 
                        hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
					>
						Reviews
					</Link>
					<Link
						to="/profile"
						className="text-gray-100 hover:text-white 
                        hover:scale-105 hover:bg-gray-800 hover:font-semibold hover:px-3 hover:py-2 hover:rounded text-lg font-medium transition-colors"
					>
						Profile
					</Link>
				</div>
				<div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">					
					<div>
						{/* <span className="font-medium text-lg">{username}</span> */} 
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header