import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { RootState, AppDispatch } from '@app/store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = async () => {
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    await dispatch(loginUser({ username, password }));
    onClose();
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'username') {
      if (value.trim().length < 2) {
        error = 'Имя пользователя должно содержать минимум 2 символа';
      }
    } else if (name === 'password') {
      if (value.length < 3) {
        error = 'Пароль должен содержать минимум 3 символа';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (name: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

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
          onChange={(e) => {
            setUsername(e.target.value);
            handleInputChange('username');
            validateField('username', e.target.value);
          }}
          placeholder="Имя пользователя"
          style={{ borderColor: errors.username ? 'red' : 'initial' }}
        />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange('password');
            validateField('password', e.target.value);
          }}
          placeholder="Пароль"
          style={{ borderColor: errors.password ? 'red' : 'initial' }}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <button onClick={handleLogin}>Войти</button>
      <button className="secondary-button" onClick={onRegister}>Регистрация</button>
      <button className="secondary-button" onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default LoginModal;
