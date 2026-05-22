import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/products/asyncThunks';

export default function Catalog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === 'loading') return <div style={styles.center}>Загрузка каталога...</div>;
  if (status === 'failed') return <div style={styles.center}>Ошибка: {error}</div>;

  const categories = ['Все', ...new Set(list.map(p => p.category))];
  const filtered = list.filter(p => 
    (selectedCategory === 'Все' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Каталог лампочек</h1>
      <div style={styles.controls}>
        <input type="text" placeholder="Поиск по названию..." value={search} onChange={e => setSearch(e.target.value)} style={styles.searchInput} />
      </div>
      <div style={styles.filters}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{...styles.filterBtn, backgroundColor: selectedCategory === cat ? 'var(--mint)' : 'white', color: selectedCategory === cat ? 'white' : 'var(--text)', borderColor: 'var(--mint)'}}>{cat}</button>
        ))}
      </div>
      <div style={styles.grid}>
        {filtered.map(p => (
          <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={styles.card}>
            <img src={p.image_url || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%2348C9B0' width='400' height='400'/%3E%3Ctext fill='white' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(p.name)}%3C/text%3E%3C/svg%3E`} alt={p.name} style={styles.image} />
            <div style={styles.content}>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>{p.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  center: { textAlign: 'center', padding: '4rem', fontSize: '1.2rem', color: 'var(--gray)' },
  title: { textAlign: 'center', marginBottom: '1.5rem' },
  controls: { display: 'flex', justifyContent: 'center', marginBottom: '1rem' },
  searchInput: { width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '1rem' },
  filters: { display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' },
  filterBtn: { padding: '0.5rem 1rem', border: '2px solid', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' },
  card: { backgroundColor: 'var(--card)', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' },
  image: { width: '100%', height: '180px', objectFit: 'cover', backgroundColor: 'var(--mint-light)' },
  content: { padding: '1rem' },
  name: { margin: '0 0 0.5rem 0', fontSize: '1rem' },
  price: { margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--mint-dark)' }
};
