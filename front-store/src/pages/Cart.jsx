import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const getTotalPrice = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return (
    <div style={styles.empty}>
      <h1>Корзина пуста</h1>
      <button onClick={() => navigate('/')} style={styles.link}>В каталог</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1>Корзина</h1>
      <div style={styles.list}>
        {items.map(item => (
          <div key={item.id} style={styles.item}>
            <img src={item.image_url || `image/svg+xml,...`} alt={item.name} style={styles.img} />
            <div style={styles.details}><h3>{item.name}</h3><p>{item.price} ₽</p></div>
            <div style={styles.qty}>
              <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} style={styles.btn}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} style={styles.btn}>+</button>
            </div>
            <p style={styles.subtotal}>{item.price * item.quantity} ₽</p>
            <button onClick={() => dispatch(removeFromCart(item.id))} style={styles.del}>✕</button>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h2>Итого: {getTotalPrice()} ₽</h2>
        <button onClick={() => navigate('/checkout')} style={styles.checkout}>Оформить заказ</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
  empty: { textAlign: 'center', padding: '4rem' },
  link: { padding: '0.5rem 1rem', background: 'var(--mint)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' },
  item: { display: 'grid', gridTemplateColumns: '70px 1fr auto auto auto', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--card)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  img: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', background: 'var(--mint-light)' },
  details: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  qty: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  btn: { width: '28px', height: '28px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', borderRadius: '4px' },
  subtotal: { fontWeight: 'bold', minWidth: '60px' },
  del: { background: '#e74c3c', color: 'white', border: 'none', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' },
  summary: { textAlign: 'right', padding: '1.5rem', background: 'var(--card)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  checkout: { padding: '1rem 2.5rem', background: 'var(--mint)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }
};
