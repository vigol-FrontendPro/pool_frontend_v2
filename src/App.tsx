import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminUsers from './pages/AdminUsers';
import AdminProducts from './pages/AdminProducts';
import './index.css';
// import BackgroundImage from './components/BackgroundImage';

// фиктивный компонент
const Pools = () => <div>Бассейны</div>;
const Hamamy = () => <div>Хамамы</div>;
const Sauny = () => <div>Сауны</div>;
const Gallereya = () => <div>Галерея</div>;
const Kontakty = () => <div>Контакты</div>;

const App: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
   
      <div className="app">
        <Header />
        {/* <BackgroundImage /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pools" element={<Pools />} />
            <Route path="/hamamy" element={<Hamamy />} />
            <Route path="/sauny" element={<Sauny />} />
            <Route path="/gallereya" element={<Gallereya />} />
            <Route path="/kontakty" element={<Kontakty />} />
            {user && user.role === 'ADMIN' && (
              <>
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/products" element={<AdminProducts />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
};

export default App;
