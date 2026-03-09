import React from 'react'
import { useRegister } from '../../api/hooks/useAuth';

const Register = () => {
  
  const { mutate: register, isPending, isError, error } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    register({
      full_name: (form.elements.namedItem('full_name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      user_role: 'STUDENT',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" placeholder="Full Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
      {isError && <p style={{ color: 'red' }}>{(error as any)?.response?.data?.message}</p>}
    </form>
  );
}

export default Register
