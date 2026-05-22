const API_URL = 'http://localhost:8002';

export const login = async (login, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  });
  if (!res.ok) throw new Error('Неверный логин или пароль');
  const data = await res.json();
  localStorage.setItem('admin_token', data.access_token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('admin_token');
};

export const getMe = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Неавторизован');
  return res.json();
};
