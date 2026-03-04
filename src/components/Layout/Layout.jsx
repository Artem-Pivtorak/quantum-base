import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import css from './Layout.module.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className={css.layout}>
      <AppBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className={css.main}>
        {/* Передаємо стан в Outlet через context, щоб Sidebar міг його отримати */}
        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
      </main>
    </div>
  );
}