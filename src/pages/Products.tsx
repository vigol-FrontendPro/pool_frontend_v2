import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchProducts, addProduct, deleteProduct } from '../app/slices/productsSlice';
import { addToCart } from '../app/slices/cartSlice';
import { Product } from '../app/slices/types';
import ProductModal from '../components/ProductModal';
import '../styles/Products.css';

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ title: '', name: '', description: '', price: 0, imageUrl: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ title: '', name: '', description: '', price: 0, imageUrl: '' });
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
                <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}>Удалить продукт</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {user?.role === 'ADMIN' && (
        <div className="add-product-form">
          <h2>Добавить продукт</h2>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            placeholder="Название"
          />
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Имя"
          />
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Описание"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
            placeholder="Цена"
          />
          <input
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            placeholder="URL изображения"
          />
          <button onClick={handleAddProduct}>Добавить продукт</button>
        </div>
      )}
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
