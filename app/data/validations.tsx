import { ValidationErrors as ErrorsInterface } from '~/types/interfaces'

type ValidationErrors = Record<string, string>

function isValidName(value: string): boolean {
	return value.trim().length >= 3
}

function isValidSurname(value: string): boolean {
	return value.trim().length >= 3
}

function isValidUsername(value: string): boolean {
	return value.trim().length >= 4
}

function isValidAge(value: number): boolean {
	return value >= 12 && value <= 110
}

function isValidEmail(value: string): boolean {
	return value.trim().includes('@')
}

// function isValidPassword(value: string): boolean {
// 	return value.trim().length >= 8
// }

interface CredentialsInput {
	name?: string
	surname?: string
	username?: string
	age?: number
	email: string
	password: string
	confirmPassword?: string
}

export function validateLoginCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {}

	if (!input.email || !isValidEmail(input.email)) {
		validationErrors.email = input.email
			? 'Invalid email address.'
			: 'Email is required.'
	}

	// if (!input.password || !isValidPassword(input.password)) {
	// 	validationErrors.password = input.password
	// 		? 'Invalid password. Must be at least 8 characters long.'
	// 		: 'Password is required.'
	// }

	if (Object.keys(validationErrors).length > 0) {
		return validationErrors
	}
}

export function validateRegisterCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {}

	if (!input.name || !isValidName(input.name)) {
		validationErrors.name = input.name
			? 'Invalid name format.'
			: 'Name is required.'
	}

	if (!input.surname || !isValidSurname(input.surname)) {
		validationErrors.surname = input.surname
			? 'Invalid surname format.'
			: 'Surname is required.'
	}

	if (!input.username || !isValidUsername(input.username)) {
		validationErrors.username = input.username
			? 'Invalid username format.'
			: 'Username is required.'
	}

	if (!input.age || !isValidAge(input.age)) {
		validationErrors.age = input.age
			? 'Invalid age format.'
			: 'Age is required.'
	}


	if (!input.email || !isValidEmail(input.email)) {
		validationErrors.email = input.email
			? 'Invalid email address.'
			: 'Email is required.'
	}

	// if (!input.password || !isValidPassword(input.password)) {
	// 	if (!input.password) {
	// 		validationErrors.password = 'Password is required.'
	// 	} else if (input.password !== input.confirmPassword) {
	// 		validationErrors.confirmPassword = 'Passwords do not match.'
	// 	} else {
	// 		validationErrors.password =
	// 			'Invalid password. Must be at least 7 characters long.'
	// 	}
	// }

	if (Object.keys(validationErrors).length > 0) {
		return validationErrors
	}
}