import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    sku: '', name: '', price: 0, stock: 0, category: '', description: '', image_url: '' 
  });
  const [error, setError] = useState('');
  
  // Фильтры и сортировка
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  // Получаем уникальные категории
  const categories = useMemo(() => 
    [...new Set(products.map(p => p.category))].filter(Boolean), 
    [products]
  );

  // Фильтрация + сортировка
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Поиск по названию и SKU
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }
    
    // Фильтр по категории
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    // Сортировка
    result.sort((a, b) => {
      let aVal = a[sortBy], bVal = b[sortBy];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [products, search, categoryFilter, sortBy, sortOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      };
      if (editing) {
        await updateProduct(editing.id, productData);
      } else {
        await createProduct(productData);
      }
      setShowForm(false);
      setEditing(null);
      setForm({ sku: '', name: '', price: 0, stock: 0, category: '', description: '', image_url: '' });
      loadProducts();
    } catch (err) {
      const errData = await err.response?.json?.();
      setError(errData?.detail || 'Ошибка: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить товар?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Ошибка удаления: ' + err.message);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.left}>
          <Link to="/dashboard" style={styles.backBtn}>← Назад</Link>
          <h1>Товары</h1>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ sku: '', name: '', price: 0, stock: 0, category: '', description: '', image_url: '' }); setError(''); }} style={styles.addBtn}>
          + Добавить товар
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {/* Фильтры */}
      <div style={styles.filters}>
        <input 
          type="text" 
          placeholder="🔍 Поиск по названию или SKU..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select 
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">Все категории</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <span style={styles.count}>Найдено: {filteredProducts.length}</span>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <h2>{editing ? 'Редактировать' : 'Новый товар'}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input placeholder="Артикул (SKU)" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} required style={styles.input} />
            <input placeholder="Название" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={styles.input} />
            <input type="number" step="0.01" placeholder="Цена" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required style={styles.input} />
            <input type="number" placeholder="Остаток" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required style={styles.input} />
            <input placeholder="Категория" value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={styles.input} list="categories" />
            <datalist id="categories">
              {categories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
            <input placeholder="URL картинки" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} style={styles.input} />
            <textarea placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={styles.textarea} />
            <div style={styles.formActions}>
              <button type="submit" style={styles.saveBtn}>Сохранить</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); setError(''); }} style={styles.cancelBtn}>Отмена</button>
            </div>
          </form>
        </div>
      )}

      {/* Таблица со скроллом */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th onClick={() => toggleSort('sku')} style={styles.sortable}>SKU {sortIcon('sku')}</th>
              <th onClick={() => toggleSort('name')} style={styles.sortable}>Название {sortIcon('name')}</th>
              <th onClick={() => toggleSort('category')} style={styles.sortable}>Категория {sortIcon('category')}</th>
              <th onClick={() => toggleSort('price')} style={styles.sortable}>Цена {sortIcon('price')}</th>
              <th onClick={() => toggleSort('stock')} style={styles.sortable}>Остаток {sortIcon('stock')}</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price} ₽</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleEdit(p)} style={styles.editBtn}>✏️</button>
                  <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  left: { display: 'flex', alignItems: 'center', gap: '1rem' },
  backBtn: { padding: '0.5rem 1rem', background: '#95a5a6', color: '#fff', textDecoration: 'none', borderRadius: '4px' },
  addBtn: { padding: '0.8rem 1.5rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { background: '#fee', color: '#c00', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' },
  
  filters: { display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' },
  searchInput: { flex: 1, minWidth: '200px', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' },
  select: { padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', minWidth: '180px' },
  count: { color: '#7f8c8d', marginLeft: 'auto' },
  
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  form: { background: '#fff', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' },
  input: { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px', boxSizing: 'border-box' },
  formActions: { display: 'flex', gap: '1rem' },
  saveBtn: { flex: 1, padding: '0.8rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '0.8rem', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  
  tableWrapper: { overflowX: 'auto', overflowY: 'auto', maxHeight: '500px', border: '1px solid #ddd', borderRadius: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', minWidth: '700px' },
  sortable: { cursor: 'pointer', userSelect: 'none', '&:hover': { background: '#f5f5f5' } },
  editBtn: { background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem', fontSize: '1.2rem' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }
};
