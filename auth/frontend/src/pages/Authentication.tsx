import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const mode = new URL(request.url).searchParams?.get('mode') || 'login';
  const url = 'http://localhost:8000/' + (mode === 'login' ? 'login' : 'signup');
  const redirectUrl = mode === 'login' ? '/events' : '/';
  const method = 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw JSON.stringify({ message: 'Could not authenticate user.', status: 500 });
  }

  const resData = await response.json();
  const { user, token } = resData;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', user.email);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect(redirectUrl);
}