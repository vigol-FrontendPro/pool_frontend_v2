import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="home-container">
      <h1>Добро пожаловать{user ? `, ${user.firstName} ${user.lastName}` : ''}</h1>
    </div>
  );
};

export default Home;
