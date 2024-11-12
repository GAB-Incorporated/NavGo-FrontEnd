import { useState } from 'react';
import { Box, Button, FormControl, useRadioGroup, FormLabel, Heading, Text, Input, Wrap, WrapItem, useToast, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import api from '../../api';
import styles from './registerForm.module.css';
import CustomRadio from '../CustomRadio';
import { useNavigate, Link, useParams } from "react-router-dom";

const RegisterForm = () => {
  const { choosedTool } = useParams()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [userType, setUserType] = useState('STUDENT');
  const [verificationCode, setVerificationCode] = useState('')
  const toast = useToast();
  const navigate = useNavigate();


  const { getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
  })
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

      const responseR = await api.post('/users/register', requestData)

      const responseL = await api.post('/users/login', {
        email,
        password,
      })

      if (responseR.status === 201 && responseL.status !== 200) {
        toast({
          title: 'Registrado com Sucesso, porém erro no Login',
          description: 'Seu usuário foi registrado, porém não foi possivel logar automaticamente. Prossiga para o login!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });

        choosedTool ? navigate("/login/"+choosedTool) : navigate("/login");
      } else if (responseR.status === 201 && responseL.status === 200) {
        toast({
          title: 'Registrado e Logado com Sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        choosedTool ? navigate("/"+choosedTool) : navigate("/subhome");
      }
      <Link to={"/subhome"}/>
    } catch (error) {
      console.log(error)
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
          <Wrap spacing="20px" maxW="100%" justify='center'> 
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <WrapItem key={value}> 
                  <CustomRadio
                    className={styles.userType}
                    {...radio}
                    borderRadius="md"
                    bg="#fff"
                    padding="1.2em"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    fontWeight="semibold"
                    _hover={{
                      bg: 'yellow.100',
                      cursor: 'pointer',
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
                    isChecked={userType === value}
                  >
                    {value}
                  </CustomRadio>
                </WrapItem>
              );
            })}
          </Wrap>
        </FormControl>
        {(userType === 'Coordenador' || userType === 'Professor') && (
          <FormControl id="verificationCode" isRequired className={styles.verificationCode}>
            <FormLabel className={styles.labelAdm}>Código de Verificação  
              <Tooltip label="Entre em contato com o administrador da plataforma de sua instituição para cadastrar um usuário verificado">
                <InfoOutlineIcon mb={'0.2em'} ml={'0.5em'} color={'black'}/>
              </Tooltip>
            </FormLabel>
            <Input
              type="text"
              placeholder="Insira o código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={styles.input}
            />
          </FormControl>
        )}
        <Text className={styles.formQuestion}> <b>Já é cadastrado?</b>
          <Link to={"/login"}>
          <Text className={styles.formLink}>
            Entre <b>Aqui!</b>
          </Text>
          </Link>
        </Text>
        <Button type="submit" className={styles.button}>
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;

