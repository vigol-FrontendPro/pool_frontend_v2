import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchProducts, addProduct, updateProduct } from '../app/slices/productsSlice';
import { Product } from '../app/slices/types';

const AdminProducts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ imageUrl: '', name: '', title: '', description: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ imageUrl: '', name: '', title: '', description: '', price: 0 });
  };

  const handleUpdateProduct = (product: Product) => {
    dispatch(updateProduct(product));
    setEditingProduct(null);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Продукты</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              <div>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: +e.target.value })}
                />
                <button onClick={() => handleUpdateProduct(editingProduct)}>Сохранить</button>
              </div>
            ) : (
              <div>
                {product.name} - {product.description} - {product.price} руб.
                <button onClick={() => setEditingProduct(product)}>Редактировать</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Добавить продукт</h2>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Название"
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
        <button onClick={handleAddProduct}>Добавить</button>
      </div>
    </div>
  );
};

export default AdminProducts;
