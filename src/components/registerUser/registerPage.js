import React, { useState } from 'react';
import api from '../../api';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('USER');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        user_type: userType
      });

      if (response.status === 201) {
        alert('Usuário registrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao registrar o usuário', error);
      alert('Erro ao registrar o usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
