import styles from "./login.module.css";
import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

const Login = () => {
    return (
        <Box className={styles.content}>
            <Box className={styles.wrapper}>
                <Header />
                <Box flexGrow={1}> 
                    <LoginForm />
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default Login;
