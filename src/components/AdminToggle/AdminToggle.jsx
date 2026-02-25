import React, { useState } from 'react';

const AdminToggle = ({ isAdmin, setIsAdmin }) => {
  const [password, setPassword] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const handleEnable = () => {
    if (password === 'admin') {
      setIsAdmin(true);
      setShowPrompt(false);
      setPassword('');
    } else {
      alert('Невірний пароль');
    }
  };

  return (
    <div style={{ display: 'inline-block', marginLeft: '20px' }}>
      <button onClick={() => setShowPrompt(!showPrompt)}>⚙️</button>
      {showPrompt && (
        <div style={{ marginTop: '5px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль адміна"
          />
          <button onClick={handleEnable}>Увійти</button>
        </div>
      )}
      {isAdmin && <span style={{ marginLeft: '10px', color: 'green' }}>Режим адміністратора</span>}
    </div>
  );
};

export default AdminToggle;