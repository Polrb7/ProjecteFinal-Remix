import { createCookieSessionStorage } from '@remix-run/node'
import { redirect } from '@remix-run/react'
import axios from 'axios'
import { LoginInput, ShowErrors } from '../types/interfaces'

const apiUrl = "http://localhost:8083"

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'authToken',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	},
})

export async function login({ email, password }: LoginInput) {
	const response = await axios.post(
		`${apiUrl}/api/login`,
		{ email, password },
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		}
	)

	if (response.status === 200 && response.data?.token) {
		const userId = response.data.user.id

		const authToken = response.data.token

		return await createUserSession(userId, authToken, '/index')
	} else {
		const validationErr: ShowErrors = {
			title: 'Invalid login credentials',
			code: '401',
		}

		throw validationErr
	}
}

async function createUserSession(
	user_id: string,
	authToken: string,
	redirectPath: string
) {
	const session = await sessionStorage.getSession()

	session.set('user_id', user_id)
	session.set('authToken', authToken)

	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	})
}

export async function register(
	name: string,
	surname: string,
	username: string,
	age: number,
	email: string,
	password: string,
	password_confirmation: string
) {
	try {
		const response = await axios.post(
			`${apiUrl}/api/register`,
			{ name, surname, username, age, email, password, password_confirmation },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

		if (response.status === 200) {
			const userId = response.data.user.id
			const authToken = response.data.token

			return createUserSession(userId, authToken, '/index')
		} else {
			const validationErr: ShowErrors = {
				title: 'Invalid signup credentials',
				code: '401',
			}

			throw validationErr
		}
	} catch (error) {
		return error
	}
}

export async function getAuthToken(request: Request): Promise<string | null> {
	const cookieHeader = request.headers.get('Cookie')
	if (!cookieHeader) return null

	const session = await sessionStorage.getSession(cookieHeader)

	const authToken = session.get('authToken')

	console.log('authToken:', authToken)
	return authToken || null
}

export async function getLoggedUserId(
	request: Request
): Promise<string | null> {
	const cookieHeader = request.headers.get('Cookie')

	if (!cookieHeader) return null

	const session = await sessionStorage.getSession(cookieHeader)

	const userId = session.get('user_id')

	return userId || null
}