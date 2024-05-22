import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { RootState, AppDispatch } from '@app/store';
import { User } from '@app/types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = async () => {
    // Проверка наличия ошибок перед отправкой данных
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Отправка данных на сервер для регистрации
    await dispatch(registerUser({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User));
    onClose();
  };

  // Функция для проверки валидности каждого поля при вводе
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'firstName' || name === 'lastName') {
      if (value.trim().length < 2) {
        error = 'Поле должно содержать минимум 2 символа';
      }
    } else if (name === 'email') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = 'Неверный формат email';
      }
    } else if (name === 'password') {
      if (value.length < 3) {
        error = 'Пароль должен содержать минимум 3 символов';
      }
    } else if (name === 'phoneNumber') {
      if (!/^\+?[0-9]{3}-?[0-9]{6,12}$/.test(value)) {
        error = 'Неверный формат номера телефона (только цифры)';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Обработчик изменения значений полей ввода для сброса ошибок
  const handleInputChange = (name: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    validateField(name, value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <label htmlFor="firstName">Имя</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            handleInputChange('firstName', e.target.value);
          }}
          placeholder="Имя"
          style={{ borderColor: errors.firstName ? 'red' : 'initial' }}
        />
        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Фамилия</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            handleInputChange('lastName', e.target.value);
          }}
          placeholder="Фамилия"
          style={{ borderColor: errors.lastName ? 'red' : 'initial' }}
        />
        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleInputChange('email', e.target.value);
          }}
          placeholder="Email"
          style={{ borderColor: errors.email ? 'red' : 'initial' }}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange('password', e.target.value);
          }}
          placeholder="Пароль"
          style={{ borderColor: errors.password ? 'red' : 'initial' }}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="phoneNumber">Телефон</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            handleInputChange('phoneNumber', e.target.value);
          }}
          placeholder="Телефон"
          style={{ borderColor: errors.phoneNumber ? 'red' : 'initial' }}
        />
        {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
      </div>
      <button onClick={handleRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default RegisterModal;
