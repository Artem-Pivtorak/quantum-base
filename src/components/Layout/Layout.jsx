import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar'; // ← змінено шлях
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div className={css.layout}>
      <AppBar />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}