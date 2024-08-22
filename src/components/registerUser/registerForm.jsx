import React, { useState } from 'react';
import {Box, Button, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Text, useToast} from '@chakra-ui/react';
import api from '../../api';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [userType, setUserType] = useState('ESTUDANTE');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/register', {
        first_name: firstName,
        last_name: lastName,
        nick_name: nickName,
        email: email,
        password_hash: password,
        user_type: userType,
      });

      if (response.status === 201) {
        toast({
          title: 'Usuário registrado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao registrar o usuário.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <Heading as="h1" size="lg" mb={6}>
          Cadastre-se
        </Heading>
        <Text fontSize="md" mb={4}>
          Responda o formulário para se cadastrar na <b>NavGo</b>
        </Text>
        <FormControl id="firstName" mb={4} isRequired>
          <FormLabel>Primeiro nome real</FormLabel>
          <Input
            type="text"
            placeholder="Primeiro nome real"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="lastName" mb={4} isRequired>
          <FormLabel>Sobrenome real</FormLabel>
          <Input
            type="text"
            placeholder="Sobrenome real"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl id="nickName" mb={4} isRequired>
          <FormLabel>Nome de usuário</FormLabel>
          <Input
            type="text"
            placeholder="Nome de usuário"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4} isRequired>
          <FormLabel>Sua senha</FormLabel>
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="passwordRe" mb={4} isRequired>
          <FormLabel>Digite sua senha novamente</FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha novamente"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
          />
        </FormControl>
        <FormControl as="fieldset" mb={6} isRequired>
          <FormLabel as="legend">Cargo</FormLabel>
          <RadioGroup
            onChange={setUserType}
            value={userType}
          >
            <Stack direction="row">
              <Radio value="ESTUDANTE">Estudante</Radio>
              <Radio value="ADMINISTRATOR">Coordenador</Radio>
              <Radio value="TEACHER">Professor</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Registrar
        </Button>
      </form>
    </Box>
  );
}

export default Register;
