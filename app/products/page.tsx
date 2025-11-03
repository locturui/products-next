'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/productsStore';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from './page.module.css';

type FilterType = 'all' | 'liked';

export default function ProductsPage() {
  const router = useRouter();
  const { products, likedIds, deletedIds, fetchProducts, toggleLike, deleteProduct } = useProductsStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const allProducts = [...products];
  const visibleProducts = allProducts.filter((product) => {
    if (deletedIds.includes(product.id)) return false;
    if (filter === 'liked' && !likedIds.includes(product.id)) return false;
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.like-btn') || target.closest('.delete-btn')) {
      return;
    }
    router.push(`/products/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <button
            onClick={() => router.push('/create-product')}
            className={styles.addButton}
          >
            + Add Product
          </button>
        </div>
        
        <div className={styles.searchContainer}>
          <div className={styles.searchRow}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.filterButtons}>
              <button
                onClick={() => setFilter('all')}
                className={`${styles.filterButton} ${
                  filter === 'all' ? styles.filterButtonActive : styles.filterButtonInactive
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('liked')}
                className={`${styles.filterButton} ${
                  filter === 'liked' ? styles.filterButtonActive : styles.filterButtonInactive
                }`}
              >
                Liked
              </button>
            </div>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products found</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {visibleProducts.map((product) => {
              const isLiked = likedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={(e) => handleCardClick(product.id, e)}
                  className={styles.productCard}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                    />
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>
                    <p className={styles.cardDescription}>
                      {product.description}
                    </p>
                    <div className={styles.cardFooter}>
                      <p className={styles.cardPrice}>${product.price}</p>
                      <span className={styles.category}>{product.category}</span>
                    </div>
                  </div>
                  
                  <div className={styles.actionButtons}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                      className={`like-btn ${styles.actionButton} ${
                        isLiked ? styles.likeButtonActive : styles.likeButton
                      }`}
                    >
                      <Icon icon={isLiked ? 'tabler:heart-filled' : 'tabler:heart'} width={20} height={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      className={`delete-btn ${styles.actionButton} ${styles.deleteButton}`}
                    >
                      <Icon icon="tabler:trash" width={20} height={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

