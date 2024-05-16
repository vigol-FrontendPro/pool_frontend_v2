import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers, deleteUser } from '../app/slices/usersSlice';

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  if (!user) {
    return <p>Вы не авторизованы</p>;
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>Имя: {user.firstName}</p>
      <p>Фамилия: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phoneNumber}</p>
      <p>Роль: {user.role}</p>
      {user.role === 'ADMIN' && (
        <div>
          <h2>Пользователи</h2>
          {loading && <p>Загрузка...</p>}
          {error && <p>{error}</p>}
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.firstName} {u.lastName} - {u.email}
                <button onClick={() => handleDeleteUser(u.id)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
