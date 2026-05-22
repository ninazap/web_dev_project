import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`} style={styles.link}>
        <img src={product.imageUrl} alt={product.name} style={styles.image} />
        <div style={styles.content}>
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.price}>{product.price} ₽</p>
        </div>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-4px)'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '1rem'
  },
  name: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem'
  },
  category: {
    margin: '0 0 0.5rem 0',
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  price: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#27ae60'
  }
};

