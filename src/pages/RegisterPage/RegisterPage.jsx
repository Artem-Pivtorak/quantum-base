import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/contacts');
  };

  return <RegisterForm onSuccess={handleSuccess} />;
}
