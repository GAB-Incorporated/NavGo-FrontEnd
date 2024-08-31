import styles from "./login.module.css";
import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = () => {
    return (
        <Box className={styles.noflow}>
            <Header />
            <LoginForm />
        </Box>
    );
}

export default Login;