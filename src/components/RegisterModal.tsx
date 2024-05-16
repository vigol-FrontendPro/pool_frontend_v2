import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../app/slices/authSlice';
import '../styles/Modals.css';
import { RootState, AppDispatch } from '../app/store';
import { User } from '../app/slices/types';

//интерфейс для свойств модального окна регистрации
interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const dispatch: AppDispatch = useDispatch(); //получаем функцию dispatch для отправки действий в redux
    const [firstName, setFirstName] = useState(''); //состояние для имени
    const [lastName, setLastName] = useState(''); //состояние для фамилии
    const [email, setEmail] = useState(''); //состояние для email
    const [password, setPassword] = useState(''); //состояние для пароля
    const [phoneNumber, setPhoneNumber] = useState(''); //состояние для номера телефона
    const error = useSelector((state: RootState) => state.auth.error); //получаем ошибку из состояния redux

    //функция для обработки регистрации
    const handleRegister = async () => {
        await dispatch(registerUser({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User)); //отправляем действие registerUser с данными пользователя
        onClose(); //закрываем модальное окно после попытки регистрации
    };

    //если модальное окно не открыто, ничего не рендерим
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Имя"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Фамилия"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Телефон"
            />
            <button onClick={handleRegister}>Регистрация</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default RegisterModal;
