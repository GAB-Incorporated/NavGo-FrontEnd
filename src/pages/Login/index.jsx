import { Flex } from "@chakra-ui/react";
import styles from "./login.module.css"
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = () => {
    return (
        <>
            <Header />
            <LoginForm />
        </>
    );
}

export default Login;