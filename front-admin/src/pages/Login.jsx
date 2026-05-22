import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginApi(form.login, form.password);
      login({ login: form.login });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Вход в панель управления</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Логин" value={form.login} onChange={e => setForm({...form, login: e.target.value})} style={styles.input} required />
        <input type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={styles.input} required />
        <button type="submit" style={styles.btn}>Войти</button>
      </form>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '400px', 
    margin: '10vh auto', 
    padding: '2rem', 
    background: '#fff', 
    borderRadius: '8px', 
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
    textAlign: 'center',
    color: '#2c3e50'
  },
  title: { 
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontSize: '1.5rem'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1rem' 
  },
  input: { 
    padding: '0.8rem', 
    border: '1px solid #ccc', 
    borderRadius: '4px',
    fontSize: '1rem'
  },
  btn: { 
    padding: '0.8rem', 
    background: '#2c3e50', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontSize: '1rem'
  },
  error: { 
    color: '#e74c3c', 
    marginBottom: '1rem' 
  }
};
