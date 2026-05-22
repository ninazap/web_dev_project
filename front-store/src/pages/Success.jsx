import { Link, useLocation } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();
  const orderId = state?.id || '00000';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h1>Заказ оформлен!</h1>
        <p style={styles.text}>Номер вашего заказа: <strong>#{orderId}</strong></p>
        <p style={styles.text}>Спасибо за покупку. Информация отправлена на вашу почту.</p>
        <Link to="/" style={styles.btn}>Вернуться в каталог</Link>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' },
  card: { textAlign: 'center', padding: '2.5rem', background: 'var(--card)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxWidth: '500px', width: '100%' },
  icon: { fontSize: '3.5rem', marginBottom: '1rem' },
  text: { color: 'var(--gray)', marginBottom: '0.5rem' },
  btn: { display: 'inline-block', padding: '1rem 2rem', background: 'var(--mint)', color: 'white', textDecoration: 'none', borderRadius: '6px', marginTop: '1.5rem' }
};
