import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '../api/orders';

const STATUSES = ['NEW', 'PAID', 'SHIPPED', 'CANCELLED'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      loadOrders();
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = { NEW: '#f39c12', PAID: '#27ae60', SHIPPED: '#3498db', CANCELLED: '#e74c3c' };
    return colors[status] || '#95a5a6';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.left}>
          <Link to="/dashboard" style={styles.backBtn}>← Назад</Link>
          <h1>Заказы</h1>
        </div>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th><th>Клиент</th><th>Email</th><th>Сумма</th><th>Статус</th><th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.email}</td>
              <td>{order.total_amount} ₽</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  style={{...styles.status, backgroundColor: getStatusColor(order.status)}}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>{new Date(order.created_at).toLocaleString('ru-RU')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  left: { display: 'flex', alignItems: 'center', gap: '1rem' },
  backBtn: { padding: '0.5rem 1rem', background: '#95a5a6', color: '#fff', textDecoration: 'none', borderRadius: '4px' },
  error: { background: '#fee', color: '#c00', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff' },
  status: { padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }
};
