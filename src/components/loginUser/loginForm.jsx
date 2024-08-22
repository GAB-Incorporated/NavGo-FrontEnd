import React, { useState } from 'react';
import api from '../../api';
import styles from './loginForm.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao realizar login', error.response ? error.response.data : error.message);
      alert('Erro ao realizar login.');
    }
  };

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.description}>Entre em sua conta <b>NavGo</b></p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default Login;
