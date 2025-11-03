'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductsStore, Product } from '@/store/productsStore';
import styles from './page.module.css';

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct } = useProductsStore();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      category: formData.category,
    };

    addProduct(newProduct);
    router.push('/products');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Create New Product</h1>
        
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="Enter product title"
              />
              {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Price *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                placeholder="0.00"
              />
              {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`${styles.textarea} ${errors.description ? styles.textareaError : ''}`}
                rows={5}
                placeholder="Enter product description"
              />
              {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Image URL *</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Category *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
                placeholder="e.g., electronics, clothing"
              />
              {errors.category && <p className={styles.errorMessage}>{errors.category}</p>}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.submitButton}
              >
                Create Product
              </button>
              <button
                type="button"
                onClick={() => router.push('/products')}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

