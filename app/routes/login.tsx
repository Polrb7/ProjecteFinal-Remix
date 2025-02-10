import { ActionFunctionArgs, redirect } from '@remix-run/node';
import LoginForm from '../components/auth/LoginForm';
import { ShowErrors } from '~/types/interfaces';
import { sessionStorage } from '~/data/auth';

const apiUrl = "http://localhost:8083";

export default function Index() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export async function createUserSession(user_id: string, authToken: string, redirectPath: string) {
  const session = await sessionStorage.getSession();

  session.set('user_id', user_id);
  session.set('authToken', authToken);

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      validationErrors: {
        email: 'Email is required',
        password: 'Password is required',
      },
      status: 400,
    };
  }

  const response = await fetch(`${apiUrl}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok){
    return {error: 'Invalid login credentials', status: 401};
  }

  const data = await response.json();
  const token = data.token;
  const userId = data.user.id;
  
  if (response.status === 200 && token) {
    return await createUserSession(userId, token, '/index');
  } else {
    const validationError: ShowErrors = {
      title: 'Invalid login credentials',
      code: '401',
    };
    throw validationError;
  }
}


