const API_URL = 'http://localhost:8001';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
});

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: getHeaders()
  });
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Ошибка обновления статуса');
  return res.json();
};
