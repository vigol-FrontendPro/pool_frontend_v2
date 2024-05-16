import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/slices/authSlice'; // Импортируем действие для входа
import '../styles/Modals.css';
import { RootState, AppDispatch } from '../app/store';

//интерфейс свойств модального окна входа
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
    const dispatch: AppDispatch = useDispatch(); //получаем функцию dispatch для отправки действий в Redux
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector((state: RootState) => state.auth.error);

    //функция для обработки входа
    const handleLogin = async () => {
        await dispatch(loginUser({ username, password })); //отправляем действие loginUser с именем пользователя и паролем
        onClose(); //закрываем модальное окно после попытки входа
    };

    //если модальное окно не открыто, ничего не рендерим
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h2>Вход</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Имя пользователя"
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
            </div>
            <button onClick={handleLogin}>Войти</button>
            <button className="secondary-button" onClick={onRegister}>Регистрация</button>
            <button className="secondary-button" onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default LoginModal;
