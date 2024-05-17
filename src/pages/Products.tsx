import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchProducts } from '../app/slices/productsSlice';
import { addToCart } from '../app/slices/cartSlice';
import { Product } from '../app/slices/types';
import ProductModal from '../components/ProductModal';
import '../styles/Products.css';

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Продукты</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <span className="product-title">{product.title}</span>
              <span className="product-price">{product.price} руб.</span>
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Добавить в корзину</button>
              {user?.role === 'ADMIN' && (
                <button onClick={(e) => { e.stopPropagation(); /* handleDeleteProduct(product.id); */ }}>Удалить продукт</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
