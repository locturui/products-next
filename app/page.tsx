import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Product App</h1>
        <Link 
          href="/products" 
          className={styles.link}
        >
          View Products
        </Link>
      </div>
    </div>
  );
}
