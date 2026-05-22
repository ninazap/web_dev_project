import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/asyncThunks';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current: product, status, error } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (status === 'loading') return <div style={styles.center}>Загрузка...</div>;
  if (error || !product) return <div style={styles.center}>Ошибка: {error || 'Товар не найден'}</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Назад</button>
      <div style={styles.grid}>
        <img src={product.image_url || `image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%2348C9B0' width='400' height='400'/%3E%3Ctext fill='white' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E`} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h1>{product.name}</h1>
          <p style={styles.meta}>Артикул: {product.sku} | Категория: {product.category}</p>
          <p style={styles.desc}>{product.description}</p>
          <p style={styles.stock}>В наличии: <strong>{product.stock} шт.</strong></p>
          <p style={styles.price}>{product.price} ₽</p>
          <div style={styles.row}>
            <label>Количество:</label>
            <input type="number" min="1" max={product.stock} value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} style={styles.input} />
          </div>
          <button onClick={handleAddToCart} style={styles.mainBtn}>Добавить в корзину</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  center: { textAlign: 'center', padding: '4rem', fontSize: '1.2rem', color: 'var(--gray)' },
  backBtn: { marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'var(--mint-light)', color: 'var(--mint-dark)', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' },
  image: { width: '100%', borderRadius: '8px', backgroundColor: 'var(--mint-light)' },
  info: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  meta: { color: 'var(--gray)', margin: 0 },
  desc: { lineHeight: '1.6', margin: 0 },
  stock: { margin: 0 },
  price: { fontSize: '2rem', fontWeight: 'bold', color: 'var(--mint-dark)', margin: '0.5rem 0' },
  row: { display: 'flex', alignItems: 'center', gap: '1rem' },
  input: { width: '80px', padding: '0.5rem', border: '2px solid var(--border)', borderRadius: '4px' },
  mainBtn: { padding: '1rem', background: 'var(--mint)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem' }
};
