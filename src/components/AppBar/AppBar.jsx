import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import css from './AppBar.module.css';

const AppBar = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className={css.header}>
      <button className={css.burger} onClick={toggleSidebar}>
        {sidebarOpen ? '✕' : '☰'}
      </button>
      <div className={css.right}>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default AppBar;