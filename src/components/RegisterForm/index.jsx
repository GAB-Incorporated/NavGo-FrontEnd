import { useState } from 'react';
import { Box, Button, FormControl, useRadioGroup,FormLabel, Heading, Input, HStack, useToast } from '@chakra-ui/react';
import api from '../../api';
import styles from './registerForm.module.css';
import CustomRadio from '../CustomRadio';


const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [userType, setUserType] = useState('STUDENT');
  const [verificationCode, setVerificationCode] = useState('')
  const toast = useToast();


  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
  })
  const group = getRootProps()
  const options = ['Estudante', 'Professor', 'Coordenador']


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordRe) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const requestData = {
        first_name: firstName,
        last_name: lastName,
        nick_name: nickName,
        email: email,
        password_hash: password,
        user_type: userType,
        verification_code: verificationCode,
      };

      
      if(userType === 'Coordenador' || userType === 'Professor'){
        requestData.verification_code = verificationCode;
      }

      const response = await api.post('/user/register', requestData)

      if (response.status === 201) {
        toast({
          title: 'Registrado com Sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro no cadastro de usuário.";
      toast({
        title: 'Falha no Registro',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className={styles.body}>
      <Box as="form" onSubmit={handleSubmit} className={styles.form}>
        <Heading as="h1" className={styles.title}>
          Cadastre-se
        </Heading>
        <FormControl id="firstName" isRequired>
          <FormLabel className={styles.label}>Primeiro nome real</FormLabel>
          <Input
            type="text"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel className={styles.label}>Sobrenome real</FormLabel>
          <Input
            type="text"
            placeholder="Sobrenomes"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl id="nickName" isRequired>
          <FormLabel className={styles.label}>Nome de usuário</FormLabel>
          <Input
            type="text"
            placeholder="Nome de usuário"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel className={styles.label}>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel className={styles.label}>Sua senha</FormLabel>
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl id="passwordRe" isRequired>
          <FormLabel className={styles.label}>Digite sua senha novamente</FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha novamente"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            className={styles.input}
          />
        </FormControl>
        <FormControl isRequired>
        <FormLabel className={styles.userTypeLabel}>Qual sua posição?</FormLabel>
          <HStack {...group} className={styles.userType}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <CustomRadio className={styles.userType} 
                key={value} 
                {...radio}
                borderRadius="md"
                bg="blue.200"
                padding="1.2em"
                transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                fontWeight='semibold'
                _hover={{
                  bg: 'yellow.100',
                  cursor: 'pointer'
                }}
                _checked={{
                  bg: 'yellow.400',
                  color: 'black',
                  borderColor: 'teal.600',
                }}
                _focus={{
                  borderColor: 'black',
                }}
                onChange={(e) => setUserType(e.target.value)}
                isChecked={userType === value}>
                {value}
              </CustomRadio>
            );
          })}
          </HStack>
        </FormControl>
        
        {(userType === 'Coordenador' || userType === 'Professor') && (
          <FormControl id="verificationCode" isRequired className={styles.verificationCode}>
            <FormLabel className={styles.label}>Código de Verificação</FormLabel>
            <Input
              type="text"
              placeholder="Insira o código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={styles.input}
            />
          </FormControl>
        )};
        <Button type="submit" className={styles.button}>
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
