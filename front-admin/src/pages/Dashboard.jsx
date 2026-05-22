import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Панель управления</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Выйти</button>
      </div>
      <div style={styles.menu}>
        <Link to="/dashboard/products" style={styles.menuItem}>📦 Товары</Link>
        <Link to="/dashboard/orders" style={styles.menuItem}>🛒 Заказы</Link>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  logoutBtn: { padding: '0.8rem 1.5rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  menu: { display: 'flex', gap: '2rem' },
  menuItem: { padding: '1.5rem 3rem', background: '#2c3e50', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '1.2rem' }
};
