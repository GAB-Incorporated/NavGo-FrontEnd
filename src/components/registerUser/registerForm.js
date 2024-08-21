import React, { useState } from 'react';
import api from '../../api';
import styles from './registerForm.module.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [userType, setUserType] = useState('ESTUDANTE');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/register', {
        //O cadastro é realizado sem foto
        first_name: firstName,
        last_name: lastName,
        nick_name: nickName,
        email: email,
        password_hash: password,
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
    <div className={styles.body}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Cadastre-se</h1>
        <p className={styles.description}>Responda o formulário para se cadastrar na <b>NavGo</b></p>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Nome</legend>
          <input
            type="text"
            placeholder="Primeiro nome real"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Sobrenome real"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
            className={styles.input}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Dados</legend>
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
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Digite sua senha novamente"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            required
            className={styles.input}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Cargo</legend>
          <label className={styles.label}>
            <input
              type="radio"
              name="role"
              value="STUDENT"
              onChange={(e) => setUserType(e.target.value)}
              defaultChecked
              className={styles.radio}
            />
            Estudante
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              name="role"
              value="ADMINISTRATOR"
              onChange={(e) => setUserType(e.target.value)}
              className={styles.radio}
            />
            Coordenador
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              name="role"
              value="TEACHER"
              onChange={(e) => setUserType(e.target.value)}
              className={styles.radio}
            />
            Professor
          </label>
        </fieldset>
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
    </div>
  );
}

export default Register;
