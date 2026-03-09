import React from 'react'
import { useLogin } from '../../api/hooks/useAuth';

const Login = () => {
  
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; 
    login(
      {
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        password: (form.elements.namedItem('password') as HTMLInputElement).value,
      },
      {
        onSuccess: () => {
          window.location.href = '/mycourse'; 
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p style={{ color: 'red' }}>{(error as any)?.response?.data?.message}</p>}
    </form>
  );
}

export default Login
