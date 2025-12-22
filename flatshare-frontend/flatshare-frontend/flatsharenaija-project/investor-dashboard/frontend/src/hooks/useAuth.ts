import { useMutation } from '@tanstack/react-query';

export function useAuth() {
  const refreshMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const res = await fetch('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!res.ok) throw new Error('Refresh failed');
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
    },
  });

  const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      refreshMutation.mutate(refreshToken);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  return { refreshAccessToken, logout };
}
