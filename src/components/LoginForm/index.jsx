import { Box, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../../api';
import styles from './loginForm.module.css';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ choosedTool }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const hasCheckedToken = useRef(false);
  const { login, isAuthenticated } = useAuth();

  // Função para verificar se o token é válido e não expirou
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Em segundos
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Erro ao decodificar o token: ", error);
      return true;
    }
  };

  // Efeito para verificar se já existe um token válido no localStorage
  useEffect(() => {
    if (hasCheckedToken.current) return;
    hasCheckedToken.current = true;

    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        toast({
          title: 'Sessão Expirada',
          description: 'Por favor, faça login novamente.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        localStorage.removeItem('token');
      } else {
        toast({
          title: 'Sessão recuperada',
          description: 'Você já está logado.',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        choosedTool ? navigate("/" + choosedTool) : navigate("/subhome");
      }
    }
  }, [choosedTool, navigate, toast]);

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Use o método 'login' do AuthContext para autenticar o usuário
        login(response.data.token);
        toast({
          title: 'Login Efetuado com Sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Redireciona para a rota escolhida ou para a página padrão
        choosedTool ? navigate("/" + choosedTool) : navigate("/subhome");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido. Tente novamente mais tarde.';
      toast({
        title: 'Falha no Login',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Redirecionar caso o usuário já esteja autenticado
  useEffect(() => {
    if (isAuthenticated) {
      choosedTool ? navigate("/" + choosedTool) : navigate("/subhome");
    }
  }, [isAuthenticated, choosedTool, navigate]);

  return (
    <Box className={styles.body}>
      <Box as="form" className={styles.form} onSubmit={handleLogin}>
        <Heading as="h1" className={styles.title}>Entrar</Heading>
        <Text className={styles.description}>
          Entre em sua conta <b>NavGo</b>
        </Text>
        <FormControl isRequired as='fieldset'>
          <FormLabel className={styles.label}>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl isRequired as='fieldset'>
          <FormLabel className={styles.label}>Senha</FormLabel>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <Text className={styles.formQuestion}>
            <b>Não possui login?</b>
            {choosedTool ? (
              <Link to={"/register/" + choosedTool}>
                <Text className={styles.formLink}>Se cadastre <b>Aqui!</b></Text>
              </Link>
            ) : (
              <Link to="/register">
                <Text className={styles.formLink}>Se cadastre <b>Aqui!</b></Text>
              </Link>
            )}
          </Text>
        </FormControl>
        <Button type="submit" className={styles.button}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
