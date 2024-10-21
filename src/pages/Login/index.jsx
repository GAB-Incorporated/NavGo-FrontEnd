import styles from "./login.module.css";
import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = () => {
    return (
        <Box className={styles.content}>
            <Box className={styles.wrapper}>
                <Header />
                <Box flexGrow={1}> 
                    <LoginForm />
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
