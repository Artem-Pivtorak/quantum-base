import React, { useState } from 'react';
import LoginForm from '../LoginPage/LoginPage';
import RegisterForm from '../RegisterPage/RegisterPage';
import css from './HomePage.module.css';

const HomePage = () => {
  const [activeForm, setActiveForm] = useState(null);

  const renderForm = () => {
    if (activeForm === 'login') return <LoginForm onSuccess={() => setActiveForm(null)} />;
    if (activeForm === 'register') return <RegisterForm onSuccess={() => setActiveForm(null)} />;
    return null;
  };

  return (
    <div>
      <header className={css.header}>
        <h1 className={css.title}>Home</h1>
        <div className={css.buttons}>
          <button
            type="button"
            className={css.button}
            onClick={() => setActiveForm('login')}
          >
            Log In
          </button>
          <button
            type="button"
            className={css.button}
            onClick={() => setActiveForm('register')}
          >
            Register
          </button>
        </div>
      </header>
      <main className={css.main}>
        {renderForm()}
      </main>
    </div>
  );
};

export default HomePage;
