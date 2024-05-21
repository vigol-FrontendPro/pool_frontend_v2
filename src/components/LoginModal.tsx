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
    await dispatch(loginUser({ username, password }));
    onClose();
  };
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'username') {
        if (value.trim().length < 3) {
            error = 'Имя пользователя должно содержать минимум 3 символа';
        }
    } else if (name === 'password') {
        if (value.length < 8) {
            error = 'Пароль должен содержать минимум 8 символов';
        }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
};



  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" value={username} onChange={(e) => {

        setUsername(e.target.value)
        validateField('username', e.target.value);}} 
        placeholder="Имя пользователя" />
      <input type="password" value={password} onChange={(e) =>{ 
        setPassword(e.target.value)
        validateField('password', e.target.value);
    }} placeholder="Пароль" />
      <button onClick={handleLogin}>Войти</button>
      <button onClick={onRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default LoginModal;
