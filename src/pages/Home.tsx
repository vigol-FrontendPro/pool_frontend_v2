import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { User } from '../app/slices/types';
import '../styles/Home.css'; 

const Home: React.FC = () => {
    // информацию о текущем пользователе
    const user: User | null = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="home-container">
            {user ? (
                <span className="welcome-message">
                    Добро пожаловать, {user.firstName} {user.lastName}
                </span>
            ) : (
                <span className="welcome-message">
                    Добро пожаловать!
                </span>
            )}
        </div>
    );
};

export default Home;
