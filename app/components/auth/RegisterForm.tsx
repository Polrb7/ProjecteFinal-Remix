import { Link, useFetcher } from '@remix-run/react'

function RegisterForm() {
	const fetcher = useFetcher()

	interface ValidationErrors {
		name?: string
		surname?: string
		username?: string
		email?: string
		age?: string
		password?: string
		confirmPassword?: string
	}

	const validationErrors: ValidationErrors = fetcher.data ? fetcher.data : {}

	const errors = {
		name: validationErrors?.name,
		surname: validationErrors?.surname,
		username: validationErrors?.username,
		email: validationErrors?.email,
		age: validationErrors?.age,
		password: validationErrors?.password,
		confirmPassword: validationErrors?.confirmPassword,
	}

	const submitBtnCaption = 'Register'
	const toggleBtnCaption = 'Already have an account? Login'
	const isSubmitting = fetcher.state === 'submitting'

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-black dark:from-gray-900 dark:to-black">
				<div className="bg-white/10 dark:bg-gray-800 backdrop-blur-md p-10 rounded-lg shadow-xl max-w-lg w-full">
					<h1 className="text-3xl font-bold text-center text-gray-100 dark:text-gray-100 mb-8">
						Register
					</h1>

					<fetcher.Form id="register-form" method="post" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.name
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Enter your name"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.name
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

							<div>
								<label
									htmlFor="surname"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.surname
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Surname
								</label>
								<input
									type="text"
									id="surname"
									name="surname"
									placeholder="Enter your surname"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.surname
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

							<div>
								<label
									htmlFor="username"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.username
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Enter your username"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.username
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

              <div>
								<label
									htmlFor="age"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.age
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Age
								</label>
								<input
									type="number"
									id="age"
									name="age"
									placeholder="Enter your age"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.age
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.email
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Enter your email"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.email
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

							
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="password"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.password
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									placeholder="Enter your password"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.password
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>

							<div>
								<label
									htmlFor="confirmPassword"
									className={`block text-sm font-medium transition-all duration-200 ${
										errors.confirmPassword
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-300 dark:text-gray-200'
									}`}
								>
									Confirm Password
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									placeholder="Re-enter your password"
									className={`w-full p-4 rounded-lg border focus:outline-none transition-all duration-200 transform ${
										errors.confirmPassword
											? 'border-red-600 focus:ring-red-400 text-red-600 focus:scale-105 focus:border-red-600 animate-shake'
											: 'focus:ring focus:ring-gray-400 focus:scale-105 focus:border-gray-400 bg-gray-800 text-gray-100 dark:text-gray-200'
									}`}
									required
								/>
							</div>
						</div>

						<div>
							{validationErrors && (
								<ul>
									{Object.entries(validationErrors).map(([key, value]) => (
										<li key={key} className="text-red-600 text-xs">
											{value}
										</li>
									))}
								</ul>
							)}
						</div>

						<button
							disabled={isSubmitting}
							type="submit"
							className={`w-full font-bold py-3 rounded-lg transition-all duration-300 transform relative ${
								isSubmitting
									? 'bg-gray-500 text-gray-300 cursor-not-allowed'
									: 'bg-gray-400 hover:bg-gray-500 text-gray-900 hover:scale-105'
							}`}
						>
							{isSubmitting && (
								<div className="absolute ml-10 left-3/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
									<div className="w-5 h-5 border-4 border-t-transparent border-gray-100 border-solid rounded-full animate-spin"></div>
								</div>
							)}
							{isSubmitting ? 'Registering...' : submitBtnCaption}
						</button>

						<Link
							to="/login"
							className="block text-center text-sm text-gray-300 dark:text-gray-200 hover:underline"
						>
							{toggleBtnCaption}
						</Link>
					</fetcher.Form>
				</div>
			</div>
		</>
	)
}

export default RegisterForm