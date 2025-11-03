'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProductsStore } from '@/store/productsStore';
import { Icon } from '@iconify/react';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products } = useProductsStore();
  const productId = parseInt(params.id as string);
  
  const allProducts = [...products];
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundContent}>
          <p className={styles.notFoundText}>Product not found</p>
          <button 
            onClick={() => router.push('/products')} 
            className={styles.backButton}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          onClick={() => router.push('/products')}
          className={styles.headerButton}
        >
          <Icon icon="tabler:arrow-left" width={16} height={16} />
          Back to Products
        </button>
        
        <div className={styles.productCard}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.title}
              fill
            />
          </div>
          <div className={styles.content}>
            <div className={styles.categoryBadge}>
              {product.category}
            </div>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <div className={styles.priceContainer}>
              <p className={styles.price}>${product.price}</p>
            </div>
            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>Description</h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

