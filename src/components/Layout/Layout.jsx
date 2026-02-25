import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';

export default function Layout() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AppBar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main>
        <Outlet context={{ isAdmin }} />
      </main>
    </>
  );
}