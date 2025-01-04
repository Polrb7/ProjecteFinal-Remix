import { ActionFunctionArgs } from '@remix-run/node'
import RegisterForm from '~/components/auth/RegisterForm'
import { register } from '~/data/auth'
import { validateRegisterCredentials } from '~/data/validations'

export default function Index() {
	return (
		<div>
			<RegisterForm />
		</div>
	)
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const name = formData.get('name') as string
    const surname = formData.get('surname') as string
	const username = formData.get('username') as string
	const age = parseInt(formData.get('age') as string, 10)
	const email = formData.get('email') as string
	const password = formData.get('password') as string
	const confirmPassword = formData.get('confirmPassword') as string

	if (!name || !surname || !username || !age || !email || !password || !confirmPassword) {
		return {
			validationErrors: {
				name: !name ? 'Name is required' : undefined,
                surname: !surname ? 'Surname is required' : undefined,
				username: !username ? 'Username is required' : undefined,
                age: !age ? 'Age is required' : undefined,
				email: !email ? 'Email is required' : undefined,
				password: !password ? 'Password is required' : undefined,
				confirmPassword: !confirmPassword
					? 'Confirm Password is required'
					: undefined,
			},
			status: 400,
		}
	}

	const validationErrors = validateRegisterCredentials({
		name,
        surname,
		username,
        age,
		email,
		password,
		confirmPassword,
	})
    
	if (validationErrors) {
		return validationErrors
	}

	try {
		return await register(name, surname, username, age, email, password, confirmPassword)
	} catch (error) {
		return error
	}
}