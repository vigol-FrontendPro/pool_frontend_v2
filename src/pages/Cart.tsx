import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { removeFromCart, clearCart } from '../app/slices/cartSlice';
import axios from 'axios';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.cart);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    // Функция для удаления продукта из корзины
    const handleRemove = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    // Функция для оформления заказа
    const handleOrder = async () => {
        if (user) {  // Проверка на наличие пользователя
            try {
                await axios.post('/api/orders', {
                    userId: user.id,
                    products: items,
                });
                dispatch(clearCart());
            } catch (error) {
                console.error('Order failed', error);
            }
        }
    };

    return (
        <div>
            <h1>Корзина</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} - Количество: {item.quantity}
                        <button onClick={() => handleRemove(item.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            {isAuthenticated && user && <button onClick={handleOrder}>Оформить заказ</button>}
        </div>
    );
};

export default Cart;
