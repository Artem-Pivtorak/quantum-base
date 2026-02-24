import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();            // ← додаємо useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting', { email, password });
    const resultAction = await dispatch(logIn({ email, password }));
    if (logIn.fulfilled.match(resultAction)) {
      // ← при успіху переходимо на /contacts
      navigate('/contacts');
    } else {
      // ← при невдачі показуємо повідомлення
      const msg = resultAction.payload?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
};