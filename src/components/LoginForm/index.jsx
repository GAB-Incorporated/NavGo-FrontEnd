import { Box, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useState } from 'react';
import api from '../../api';
import styles from './loginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast({
          title: 'Login Efetuado com Sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Falha no Login',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        </FormControl>
        <Button type="submit" className={styles.button}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
