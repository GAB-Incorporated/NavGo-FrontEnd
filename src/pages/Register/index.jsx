import { Flex } from "@chakra-ui/react";
import styles from "./register.module.css"
import RegisterForm from "../../components/RegisterForm";
import Header from "../../components/Header";

const Register = () => {
    return (
       <>
        <Header />
        <RegisterForm />
       </>
    );
}

export default Register;