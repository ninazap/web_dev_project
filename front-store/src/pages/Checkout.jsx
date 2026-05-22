import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../features/orders/ordersSlice';
import { clearCart } from '../features/cart/cartSlice';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { status, error } = useSelector(state => state.orders);
  const [form, setForm] = useState({ customer_name: '', email: '', phone: '', delivery_address: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...form,
      items: items.map(i => ({
        product_id: i.id,
        product_name: i.name,
        price_at_purchase: i.price,
        quantity: i.quantity
      }))
    };

    dispatch(createOrder(orderData)).unwrap()
      .then((response) => {
        dispatch(clearCart());
        navigate('/success', { state: { id: response.id } });
      })
      .catch((err) => {
        alert('Ошибка: ' + (err.message || 'Не удалось создать заказ'));
      });
  };

  if (status === 'loading') return <div style={styles.center}>Оформляем заказ...</div>;

  return (
    <div style={styles.container}>
      <h1>Оформление заказа</h1>
      <form onSubmit={handleSubmit} style={styles.grid}>
        <div style={styles.form}>
          <label style={styles.label}>ФИО *</label>
          <input required name="customer_name" value={form.customer_name} onChange={handleChange} style={styles.input} />
          <label style={styles.label}>Email *</label>
          <input required name="email" type="email" value={form.email} onChange={handleChange} style={styles.input} />
          <label style={styles.label}>Телефон</label>
          <input name="phone" value={form.phone} onChange={handleChange} style={styles.input} />
          <label style={styles.label}>Адрес доставки *</label>
          <textarea required name="delivery_address" rows="3" value={form.delivery_address} onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.submitBtn} disabled={status === 'loading'}>Подтвердить заказ</button>
        </div>
        <div style={styles.side}>
          <h2>Ваш заказ</h2>
          {items.map(i => <div key={i.id} style={styles.row}><span>{i.name}</span><span>{i.quantity} × {i.price} ₽</span></div>)}
          <div style={styles.total}><strong>Итого: {items.reduce((s, i) => s + i.price * i.quantity, 0)} ₽</strong></div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  center: { textAlign: 'center', padding: '4rem', fontSize: '1.2rem', color: 'var(--gray)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  label: { fontWeight: '500', marginBottom: '0.25rem' },
  input: { padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '6px', fontSize: '1rem' },
  submitBtn: { padding: '1rem', background: 'var(--mint)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', marginTop: '0.5rem' },
  side: { padding: '1.5rem', background: 'var(--card)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: 'fit-content' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' },
  total: { marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--mint)', fontSize: '1.25rem' }
};
