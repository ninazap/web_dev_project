import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const count = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>💡 LampStore</Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Каталог</Link>
          <Link to="/cart" style={styles.cartLink}>
            🛒 Корзина
            {count > 0 && <span style={styles.badge}>{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: { backgroundColor: '#2c3e50', color: 'white', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' },
  nav: { display: 'flex', gap: '2rem' },
  link: { color: 'white', textDecoration: 'none' },
  cartLink: { color: 'white', textDecoration: 'none', position: 'relative' },
  badge: { position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }
};
