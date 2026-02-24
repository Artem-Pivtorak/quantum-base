import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUserName } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userMenu}>
      <span className={css.userName}>Welcome, {userName}!</span>
      <button onClick={handleLogOut} className={css.logoutButton}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
