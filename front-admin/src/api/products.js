const API_URL = 'http://localhost:8000';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
});

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Ошибка создания');
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Ошибка удаления');
  return res.json();
};
