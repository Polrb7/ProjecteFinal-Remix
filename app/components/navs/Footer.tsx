const Footer: React.FC = () => {
	return (
		<footer className="bg-black text-gray-100 text-center px-8 py-5 shadow-lg">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
				<p className="text-sm text-center md:text-base font-medium">
					&copy; {new Date().getFullYear()} |{' '}
					<strong>El Llibres</strong> All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer