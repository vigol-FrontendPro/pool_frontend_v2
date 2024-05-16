import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logoutUser, logout } from '../app/slices/authSlice';
import logo from '../image/logo.png';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../styles/Header.css';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  // Функция для выхода из системы
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <a href="/"><img src={logo} alt="Logo" /></a>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/bass/">Бассейны</Link>
            </li>
            <li>
              <Link to="/hamamy/">Хамамы</Link>
            </li>
            <li>
              <Link to="/sauny/">Сауны</Link>
            </li>
            <li>
              <Link to="/gallereya/">Галерея</Link>
            </li>
            <li>
              <Link to="/kontakty/">Контакты</Link>
            </li>
            <li>
              <Link to="/products">Продукты</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile">Профиль</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-button">Выйти</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => setLoginModalOpen(true)} className="nav-button">Войти</button>
              </li>
            )}
            <li className="cart-icon">
              <Link to="/cart">
                <FaShoppingCart size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onRegister={() => { setLoginModalOpen(false); setRegisterModalOpen(true); }} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </header>
  );
};

export default Header;
