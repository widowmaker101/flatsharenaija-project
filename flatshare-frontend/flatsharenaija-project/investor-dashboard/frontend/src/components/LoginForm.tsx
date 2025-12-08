import { useForm } from 'react-hook-form';
import posthog from '../lib/posthog';

interface LoginData {
  username: string;
  password: string;
}

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    posthog.capture('registration_start');
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Login failed');
      const { access_token, refresh_token } = await res.json();
      localStorage.setItem('token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      posthog.capture('registration_complete');
      window.location.href = '/listings';
    } catch (err) {
      posthog.capture('registration_failed');
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" {...register('username')} />
      <input type="password" placeholder="Password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  );
}
